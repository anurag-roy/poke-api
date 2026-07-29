---
title: R2 bucket pokeapi
tags: [entity, cloudflare, r2]
updated: 2026-07-29
---

# R2 bucket (`pokeapi`)

Cloudflare R2 bucket holding Pokémon JSON and images.

## Objects

| Key pattern | Purpose |
| --- | --- |
| `index.json` | Array of summary entries (905 items) — used as seed inventory |
| `{id}.json` | Full detail document for one Pokémon |
| `{id}.webp` | Sprite / artwork (referenced by `imageUrl` in JSON) |

## Public host

Images (and JSON) are available at:

`https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/`

The API does **not** proxy images. Clients load `imageUrl` directly from this host.

## Seed usage

[`scripts/seed.ts`](../../scripts/seed.ts) fetches `index.json` and each `{id}.json` from the public host, then upserts into D1 via `wrangler d1 execute`. The Worker declares an R2 binding for the same bucket but runtime list/detail paths are D1-only.

## Related

- [Seed pipeline](../concepts/seed-pipeline.md)
- [D1 database](d1-database.md)
