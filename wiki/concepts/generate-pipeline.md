---
title: Generate pipeline (append National Dex)
tags: [concept, ops, data]
updated: 2026-07-29
sources: []
---

# Generate pipeline

Append-only CLI that builds new default National Dex Pokémon (JSON + WebP) for R2 upload. Script: [`scripts/generate-pokemon.ts`](../../scripts/generate-pokemon.ts).

## Command

```bash
npm run generate:pokemon
```

## Behavior

1. Discover `pokemon-species` with `id > 905` via PokéAPI HTTP (paginated).
2. For each id, fetch default variety + nested English names/texts (queued with `p-queue` for fair use).
3. Download official-artwork PNG; compute dominant color among opaque pixels; lighten with factor **0.4** over white; store that hex as `color`.
4. Flatten PNG onto that background with `sharp`, encode WebP.
5. Write `{id}.json` / `{id}.webp` under gitignored `data/generated/`.
6. Fetch live R2 `index.json`, keep entries `id ≤ 905`, append new summaries, write full `index.json`.

Fail-loud: missing artwork or required English fields skips writing that id into the index and exits non-zero if any failed.

Does **not** upload to R2 or seed D1 — see [seed pipeline](seed-pipeline.md) after you publish objects.

## Related

- [Pokémon data model](pokemon-data-model.md)
- [R2 pokeapi](../entities/r2-pokeapi.md)
- [Seed pipeline](seed-pipeline.md)
