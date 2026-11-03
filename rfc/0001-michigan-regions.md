Michigan MeshCore Regions

**RFC-001**
Status: Draft

**Goal:**
Create a shared region-scoping standard for Michigan that reduces unnecessary RF flooding while preserving useful local, regional, statewide, and interstate connectivity.

## Scope and intent

This RFC establishes an initial shared hierarchy for naming Michigan MeshCore regions. Regions represent practical RF propagation and community domains rather than political boundaries. The hierarchy is intended to support useful communication at several geographic scales while avoiding traffic where it provides little value.

The design is intended to scale as communities and coverage grow. It does not assign ownership of a region, grant authority over a region's traffic, or provide a means for one community to take control of another. Region scopes are a shared coordination mechanism for limiting extraneous flooding while preserving useful connectivity and local autonomy.

This draft defines an initial Michigan hierarchy and illustrates how neighboring states could fit beneath `midwest`. The example state branches do not define or govern those states' regional structures.

## Quick glossary

| Term | Plain-language meaning |
| --- | --- |
| **Companion** | The user-facing MeshCore node and app used to send and receive messages. |
| **Repeater** | A node that hears traffic over RF and may transmit it again so it can travel farther. |
| **Region** | An agreed name for an RF propagation and community domain, such as `mi-west` or `grr`. |
| **Region name / tag** | The exact text used to identify a region. This RFC sometimes says “tag” informally; MeshCore generally calls it a region name. |
| **Repeater regions / carried regions** | The region names a repeater is explicitly configured and permitted to forward. They answer: “What scoped traffic will this repeater pass on?” |
| **Scope / region scope** | The one region selected for an outgoing message. It answers: “How far should this message travel?” |
| **Channel** | A group conversation such as `#grr`. Its name and encryption settings are separate from its region scope. A channel name does not set its scope automatically. |
| **Hierarchy** | The broad-to-local organization of region names. It documents their relationship but does not make MeshCore inherit forwarding permissions. |
| **Full ancestry** | Every applicable region from broadest to most local, configured separately on a repeater—for example `midwest`, `mi`, `mi-west`, and `grr`. |
| **Scoped traffic** | Traffic sent with a named region scope. Only repeaters carrying that exact region can continue forwarding it. |
| **Unscoped traffic / `*`** | Legacy traffic sent without a named scope. `*` is the null-region setting that controls whether a repeater forwards it. |

## Initial hierarchy

```text
midwest
├── mi
│   ├── mi-west
│   │   ├── grr
│   │   ├── mkg (example)
│   │   └── azo
│   ├── mi-central
│   │   ├── thumb
│   │   └── midstate
│   ├── mi-east
│   │   └── det (example)
│   ├── mi-north
│   │   ├── gdw (proposed)
│   │   ├── cad (proposed)
│   │   ├── tvc (proposed)
│   │   └── apn (proposed)
│   └── mi-upper
│       ├── ciu (proposed)
│       ├── mqt (proposed)
│       └── cmx (proposed)
├── il (example)
├── wi (example)
└── in (example)
```

Michigan subregion names use a parent-first `mi-` prefix so they remain recognizable, group together, and avoid collisions with similarly named regions elsewhere. In this draft, `mi-north` refers to the northern Lower Peninsula and `mi-upper` refers to the Upper Peninsula.

The example local branches `mkg` (Muskegon) and `det` (Detroit) illustrate
how city or metro scopes can nest beneath Michigan subregions. The
`gdw`, `cad`, `tvc`, `apn`, `ciu`, `mqt`, and `cmx` branches are
Northern Michigan Mesh **proposed local references**, not statewide
adoptions or hard geographic boundaries. See RFC-001 Addendum A for
the corresponding county reference and precedence rules.

The `azo` branch is adopted by participating Kalamazoo-area repeater operators rather than listed only as an example.

## How repeater tags and channel scopes work

Repeater regions/tags and companion channel scopes do different jobs:

- **Repeater regions/tags answer:** “What scoped traffic will this repeater pass on?”
- **A companion scope answers:** “How far should this outgoing message travel?”

For example, a repeater installed on a home in the Grand Rapids area would normally carry the full set of regions that it serves:

```text
midwest
mi
mi-west
grr
```

These are four separate forwarding permissions. The hierarchy helps people organize and understand them, but MeshCore does not automatically inherit them. The repeater must be explicitly configured to carry each region. It can then forward a message scoped to any one of those four regions.

During a transition to scoped traffic, the repeater may also continue allowing `*`, the null region, so that it forwards legacy unscoped messages. Merely adding named regions does not disable unscoped flooding.

On a companion, each group channel can have its own outgoing scope. A practical setup could be:

| Channel | Outgoing scope | Intended reach |
| --- | --- | --- |
| `#michigan` | `mi` | Statewide Michigan conversation |
| `#wmi` | `mi-west` | Conversation across West Michigan |
| `#grr` | `grr` | Conversation within the greater Grand Rapids area |

Channel names and scopes are independent. Naming a channel `#grr` does not scope it automatically; its region scope must be explicitly set to `grr`. Each outgoing message uses the one scope selected for its channel:

- Choose `grr` for everyday conversation intended for the Grand Rapids area.
- Choose `mi-west` when the conversation is useful across West Michigan.
- Choose `mi` for statewide traffic.
- Choose `midwest` only when the traffic is genuinely useful across the broader interstate region.

Selecting `grr` for Public does not limit the companion to receiving only `grr` messages. The companion can still receive Public messages using `grr`, `mi-west`, `mi`, `midwest`, or another scope when those messages reach it through repeaters configured to forward them. Unscoped legacy traffic may also continue to propagate where repeaters allow it.

The practical rule is simple: repeaters carry the scopes they are willing to forward; companions choose how far each outgoing conversation should travel. Scope local conversation narrowly rather than using the widest available region by default.

This behavior follows the [Pacific Northwest MeshCore Region Strategy](https://gessaman.com/meshcore/regions/#choosing-a-channel-scope) and the [MeshCore region-filtering documentation](https://blog.meshcore.io/2026/01/20/region-filtering).

## Region meanings

### `midwest`

The `midwest` region is the broad interstate coordination domain containing Michigan and neighboring or nearby Midwestern MeshCore communities.

The commonly recognized [U.S. Census Midwest region](https://www.census.gov/programs-surveys/popest/guidance-geographies/terms-and-definitions.html) provides a geographic reference for this name. However, `midwest` is an RF propagation and community domain, not a strict adoption of Census boundaries. Participation should follow useful interstate connectivity, propagation relationships, and coordination between communities.

The region is intended for traffic that is genuinely useful across state or major regional boundaries. It is not a default destination for local or statewide traffic, nor does it grant any participant authority over traffic within another region.

### `mi`

The `mi` region uses Michigan's recognizable geographic boundary to provide a practical scope for statewide coordination. The state boundary is a reference for organizing traffic, not a claim that RF propagation or communities stop at the border.

The region is intended for traffic useful across Michigan that does not need the broader interstate scope of `midwest`. It does not assign ownership of Michigan traffic or authority over communities within the state.

### `mi-west`

The `mi-west` region is the West Michigan coordination domain. Like `midwest`, the name describes a commonly understood geographic and community area with intentionally flexible edges; `mi-west` applies the same idea at a more local scale within Michigan.

Its practical scope should follow useful RF propagation, coverage, and relationships among West Michigan communities rather than fixed county or municipal boundaries. Communities near an edge may reasonably connect through the region when propagation and shared interests make that useful.

The region is intended for traffic useful across multiple West Michigan communities that is too broad for a local region such as `grr` but does not need statewide `mi` scope. It does not grant any participant ownership of West Michigan or authority over another community's traffic.

### `grr`

The `grr` region is the local coordination domain centered on the Grand Rapids metropolitan area, including nearby suburbs and communities connected to the metro area.

Its edges are intentionally flexible. Participation should follow useful local RF propagation, coverage, and community relationships rather than a fixed radius or a hard list of cities, townships, or counties. A nearby community may reasonably use `grr` when it shares local traffic and practical connectivity with the Grand Rapids area.

The region is intended for traffic useful within the greater Grand Rapids area that does not need the broader West Michigan scope of `mi-west`. It does not grant Grand Rapids or any participant ownership of the surrounding area or authority over another community's traffic.

### `azo`

The `azo` region is the local coordination domain for the Kalamazoo area. Participating Kalamazoo repeaters carry the full ancestry `midwest`, `mi`, `mi-west`, and `azo`, with each region configured separately.

Like the other local regions in this RFC, `azo` has intentionally flexible edges. Its practical scope should follow useful local RF coverage and community relationships rather than a fixed municipal or county boundary.

### Northern Michigan Mesh local references (proposed)

The Northern Michigan Mesh county map groups the northern Lower Peninsula
beneath `mi-north` (`gdw`, `cad`, `tvc`, `apn`) and the Upper Peninsula
beneath `mi-upper` (`ciu`, `mqt`, `cmx`). The proposal keeps the
Upper Peninsula as a separate parent scope for independent coordination
and potential future subdivisions.

For example, a repeater serving the Clare County area may explicitly
carry `midwest`, `mi`, `mi-north`, and `gdw`; a repeater in the
western Upper Peninsula may explicitly carry `midwest`, `mi`,
`mi-upper`, and `cmx`. Region ancestry is not inherited automatically.

Addendum A documents the complete proposed county mapping. The names and
county groupings do not assign ownership, impose hard RF borders, or imply
that every operator has agreed to adopt them.

These descriptions communicate intended scope; they do not establish political or rigid RF borders.

## Design principles

- Scope regions around useful RF propagation and real communities of communication.
- Preserve paths for local, regional, statewide, and interstate connectivity.
- Reduce unnecessary RF flooding by avoiding scopes broader than the communication need.
- Preserve local autonomy; participation in the hierarchy does not imply ownership or control of a region or its traffic.
- Allow the hierarchy to scale as propagation patterns and communities evolve.
- Use a clear hierarchy so broader and narrower domains remain understandable.
- Add regions only when their practical purpose and community are understood.
- Keep unsettled boundaries and statewide subdivisions open until there is agreement.
