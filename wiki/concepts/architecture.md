---
title: Architecture
tags: [concept]
updated: 2026-07-29
---

# Architecture

## Before (Deno Deploy)

- Oak router, `Deno.serve` / `app.listen`
- Deno KV with dual keys: `['pokemon', id]` and `['pokemon_by_name', name]`
- Lume-built static docs served from `_site`
- `Deno.cron` for POTD
- Images already on Cloudflare R2 public URLs

## After (Cloudflare Workers)

- Hono app exporting `fetch` + `scheduled`
- Single D1 row per Pokémon (`detail` JSON blob) + `meta` for POTD id
- JSX homepage instead of Lume
- Wrangler + npm (`package.json`); no Deno lockfile
- CLI seed from R2 → D1 (no public migrate route)

## Invariants

1. Widget-facing JSON shape stays the same ([API surface](api-surface.md), [data model](pokemon-data-model.md)).
2. Runtime data path is D1-only.
3. Image URLs remain R2 public URLs inside stored JSON.

## Related

- [poke-api Worker](../entities/poke-api-worker.md)
- [Overview](../overview.md)
