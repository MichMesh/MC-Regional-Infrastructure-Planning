// Checks the files in data/ against each other. Runs on every pull request
// (.github/workflows/validate-data.yml) and locally with:
//
//   node scripts/validate-data.mjs
//
// No dependencies. It prints every problem it finds, then exits non-zero if
// there were any. data/README.md explains what each file and field means.

import { readFileSync } from 'node:fs';

const problems = [];
const fail = (msg) => problems.push(msg);

function load(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    fail(`${path}: ${err.message}`);
    return null;
  }
}

const counties = load('data/county-subregions.json');
const local = load('data/local-regions.json');
const places = load('data/places.json');
if (problems.length) finish();

// Region names follow RFC-001: short, lowercase, letters, digits and hyphens,
// starting with a letter. No "#"; MeshCore adds it internally.
const NAME = /^[a-z][a-z0-9-]{1,15}$/;
// Names above the subregions, plus RFC-001's neighboring-state examples.
const RESERVED = new Set(['midwest', 'mi', 'il', 'wi', 'in']);
const STATUSES = new Set(['in-use', 'proposed', 'example']);

// --- county-subregions.json ---------------------------------------------
const subregions = counties.subregions ?? {};
const countyNames = new Map(); // name -> subregion
for (const [sub, def] of Object.entries(subregions)) {
  if (!NAME.test(sub)) fail(`county-subregions: subregion "${sub}" isn't a valid region name`);
  if (!def.label) fail(`county-subregions: subregion "${sub}" has no label`);
  for (const c of def.counties ?? []) {
    if (countyNames.has(c.name)) fail(`county-subregions: ${c.name} is listed under both ${countyNames.get(c.name)} and ${sub}`);
    countyNames.set(c.name, sub);
  }
}
for (const [fips, c] of Object.entries(counties.counties ?? {})) {
  const listed = countyNames.get(c.name);
  if (!listed) fail(`county-subregions: county ${fips} (${c.name}) isn't in any subregion's list`);
  else if (listed !== c.subregion) fail(`county-subregions: ${c.name} is under ${listed} in subregions but ${c.subregion} in counties`);
  const path = ['midwest', 'mi', c.subregion].join(' ');
  if ((c.path ?? []).join(' ') !== path) fail(`county-subregions: ${c.name} path should be "${path}"`);
}
if (countyNames.size !== 83) fail(`county-subregions: expected all 83 Michigan counties, found ${countyNames.size}`);

// --- local-regions.json ---------------------------------------------------
const tags = new Set();
for (const r of local.regions ?? []) {
  const at = `local-regions: ${r.tag ?? '(no tag)'}`;
  if (!NAME.test(r.tag ?? '')) fail(`${at}: tag must be 2-16 lowercase letters, digits or hyphens, starting with a letter`);
  if (tags.has(r.tag)) fail(`${at}: listed twice`);
  if (RESERVED.has(r.tag) || subregions[r.tag]) fail(`${at}: already used above the local level`);
  tags.add(r.tag);
  if (!r.name) fail(`${at}: needs a name`);
  if (!subregions[r.subregion]) fail(`${at}: subregion "${r.subregion}" isn't in county-subregions.json`);
  if (!STATUSES.has(r.status)) fail(`${at}: status must be one of ${[...STATUSES].join(', ')}`);
  for (const c of r.suggestedCounties ?? []) {
    if (!countyNames.has(c)) fail(`${at}: suggested county "${c}" isn't a Michigan county name in county-subregions.json`);
    else if (countyNames.get(c) !== r.subregion) fail(`${at}: suggested county ${c} is in ${countyNames.get(c)}, not ${r.subregion}`);
  }
}

// --- places.json ----------------------------------------------------------
for (const [place, county] of Object.entries(places.places ?? {})) {
  if (!countyNames.has(county)) fail(`places: "${place}" points at "${county}", which isn't a county name in county-subregions.json`);
}

finish();

function finish() {
  if (problems.length) {
    console.error(problems.join('\n'));
    console.error(`\n${problems.length} problem(s) found.`);
    process.exit(1);
  }
  console.log(`validate-data: OK (${countyNames.size} counties, ${tags.size} local regions, ${Object.keys(places.places).length} places)`);
}
