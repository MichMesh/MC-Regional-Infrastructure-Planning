# Region data

Machine-readable versions of what RFC-001 and Addendum A say, so tools don't
each keep their own copy. If a tool and this folder disagree, this folder
wins.

| File | What it holds | Changed by |
| --- | --- | --- |
| [`county-subregions.json`](county-subregions.json) | Every Michigan county's default subregion, and each subregion's label | A change to [Addendum A](../rfc/0001-addendum-a-scoping-and-county-reference.md) Part 2 |
| [`local-regions.json`](local-regions.json) | Local regions (`grr`, `azo`, …), their subregion and status | A [local region proposal](#adding-a-local-region) |
| [`places.json`](places.json) | City, township and village names → county, for search boxes | Anyone; it's lookup help only |

Run `node scripts/validate-data.mjs` after any change. The same check runs on
every pull request and fails if the files disagree with each other.

## Who uses it

- **[Region Configurator on michmesh.com](https://michmesh.com/docs/MeshCore/Region-Configurator)**
  ([source](https://github.com/MichMesh/docusaurus/tree/master/src/components/RegionConfigurator)).
  Reads these files from `main` when the page loads, so a merged change shows up
  within minutes. It keeps a bundled copy as a fallback for when GitHub can't be
  reached.
- **[Region map](https://optimetrics.github.io/mesh-region-map/)**
  ([source](https://github.com/Optimetrics/mesh-region-map)). Its subregion
  shapes are built from `county-subregions.json`.

If you build something else on this data, add it here so people know to check
it when the format changes.

## county-subregions.json

- `subregions.<name>.label`: the human name, e.g. `"West Michigan"`.
- `subregions.<name>.basis`: why these counties, in a sentence.
- `subregions.<name>.counties`: `{ "fips", "name" }` for each county.
- `counties.<fips>`: the same assignment keyed by FIPS code, with the full
  `path` a repeater there would carry: `["midwest", "mi", "<subregion>"]`.

County assignments are a default, not a border. A repeater carries the
regions of the area it actually covers.

## local-regions.json

One entry per tag:

| Field | Meaning |
| --- | --- |
| `tag` | The region name repeaters define. Lowercase letters, digits and hyphens, 2–16 characters, starting with a letter. No `#`. |
| `name` | What people call the area. |
| `subregion` | The subregion it sits under. Must exist in `county-subregions.json`. |
| `status` | `in-use`: repeaters carry it today. `proposed`: named in an RFC but not settled. `example`: an illustration in RFC-001; don't carry it. |
| `suggestedCounties` | Counties where a repeater most likely serves this area. Tools use it to pre-fill a choice; it isn't a boundary. Every county must be in the same subregion. Can be empty. |
| `source` | Where the region was agreed: an RFC, an issue or a PR. |

Tools offer only `in-use` regions to operators.

## Adding a local region

Local regions belong to the communities that use them (RFC-001), so the bar is
agreement among the operators who'll carry it, not approval from anyone else.

1. **Propose it.** Open a
   [local region issue](https://github.com/MichMesh/MC-Regional-Infrastructure-Planning/issues/new?template=local-region.yml).
   The form asks for the tag, the area, the subregion, the repeaters and the
   operators who agree.
2. **Agree on it.** Talk it through on the issue and with neighboring
   operators, so two regions don't claim the same coverage.
3. **Add it.** Open a pull request that adds an entry to
   `local-regions.json`, with `status` set to `in-use` once repeaters carry it,
   or `proposed` while it's still being worked out. Put the issue link in
   `source`. If RFC-001's tree should show it, update the tree in the RFC and
   in the top-level README in the same pull request.
4. **Merge it.** The validation check has to pass. Once merged, the Region
   Configurator offers it within minutes.

To retire a region, set its status back to `proposed` or remove it, and say
why in the pull request.

## Adding a place to the search

Add `"Place name": "County"` to `places.json`, with the county spelled exactly
as in `county-subregions.json`. Keep the list in alphabetical order.

## Moving a county to another subregion

That's a change to Addendum A, so it needs the same discussion as any RFC
change. Update the county's entry in both `subregions` and `counties` in
`county-subregions.json`, run the validator, and note the change in the
Addendum. The region map's shapes need regenerating afterwards; its README
says how.
