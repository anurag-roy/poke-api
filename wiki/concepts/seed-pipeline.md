---
title: Seed pipeline
tags: [concept, ops]
updated: 2026-07-29
---

# Seed pipeline

One-shot CLI that loads R2 Pokémon JSON into D1. Script: [`scripts/seed.ts`](../../scripts/seed.ts).

## Commands

```bash
npm run db:migrate:local   # or :remote
npm run seed               # local D1
npm run seed:remote        # remote D1
```

## Steps

1. Fetch `index.json` from the public R2 host (same content as bucket `pokeapi`).
2. For each id, fetch `{id}.json`.
3. Upsert batches via `wrangler d1 execute` (`INSERT … ON CONFLICT DO UPDATE`).
4. If `meta.potd_id` is missing, set it to the lowest id.

No HTTP migrate route — keeps the public API surface identical for widgets.

## Related

- [R2 pokeapi](../entities/r2-pokeapi.md)
- [D1 database](../entities/d1-database.md)
