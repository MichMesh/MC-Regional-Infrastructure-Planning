# Michigan MeshCore Regions

This repository develops a shared region-scoping standard for Michigan MeshCore communities.

The draft treats regions as RF propagation and community domains, not political boundaries. Its purpose is to reduce unnecessary RF flooding while preserving useful connectivity at local, regional, statewide, and interstate scales.

## RFCs

- [RFC-001: Michigan MeshCore Regions](rfc/0001-michigan-regions.md) — Draft
- [RFC-001 Addendum A: Scoping Policy and Reference County Assignments](rfc/0001-addendum-a-scoping-and-county-reference.md) — Draft

## Data

[`data/`](data/README.md) holds the machine-readable side of the RFCs: every county's default subregion, the local regions and their status, and a place-name lookup. Tools such as the [Region Configurator](https://michmesh.com/docs/MeshCore/Region-Configurator) read it directly, so this repository is the one place to change them.

To propose a local region for your area, open a [local region issue](https://github.com/MichMesh/MC-Regional-Infrastructure-Planning/issues/new?template=local-region.yml). [data/README.md](data/README.md#adding-a-local-region) walks through the rest.

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
│   │   └── tvc (example)
│   └── mi-upper
│       └── mqt (example)
├── il (example)
├── wi (example)
└── in (example)
```

The city and neighboring-state examples illustrate how the model can scale; they do not establish hard boundaries or govern another community's regional structure.
