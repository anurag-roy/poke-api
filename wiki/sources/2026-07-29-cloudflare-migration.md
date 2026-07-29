---
title: Source — Cloudflare migration notes
tags: [source]
updated: 2026-07-29
sources: [raw/sources/2026-07-29-cloudflare-migration.md]
---

# Source: Cloudflare migration notes (2026-07-29)

Raw: [`raw/sources/2026-07-29-cloudflare-migration.md`](../../raw/sources/2026-07-29-cloudflare-migration.md)

## Takeaways

- Deno Deploy project gone → move to Workers + Hono + D1.
- Keep widget API; D1 stores full detail JSON; CLI seed from R2; cron POTD by id.
- Shipped at `https://poke-api.anuragroy.workers.dev`; 905 Pokémon seeded.
- CI needs `CLOUDFLARE_API_TOKEN` (scoped token).

## Wiki impact

Populated [overview](../overview.md), entities (Worker/D1/R2/CI), and concepts (architecture, API, seed, POTD, data model).
