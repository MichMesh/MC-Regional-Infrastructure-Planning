# Michigan MeshCore Regions

This repository develops a shared region-scoping standard for Michigan MeshCore communities.

The draft treats regions as RF propagation and community domains, not political boundaries. Its purpose is to reduce unnecessary RF flooding while preserving useful connectivity at local, regional, statewide, and interstate scales.

## RFCs

- [RFC-001: Michigan MeshCore Regions](rfc/0001-michigan-regions.md) — Draft
- [RFC-001 Addendum A: Scoping Policy and Reference County Assignments](rfc/0001-addendum-a-scoping-and-county-reference.md) — Draft; includes proposed Northern Michigan Mesh county alignment

## Current draft hierarchy

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

The city and neighboring-state examples illustrate how the model can scale; they do not establish hard boundaries or govern another community's regional structure.

## County references

- [Michigan parent subregions](data/county-subregions.json): all 83 counties; proposed November 2026 alignment moves seven counties to `mi-north` while leaving `mi-upper` unchanged.
- [Northern Michigan Mesh proposed local regions](data/county-local-regions.json): 46 counties organized under `gdw`, `cad`, `tvc`, `apn`, `ciu`, `mqt`, and `cmx`.

County assignments are planning references, **not RF coverage boundaries or mandatory repeater configurations**. The proposal does not imply adoption by other operators.
