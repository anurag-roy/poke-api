# Cloudflare migration session notes

Date: 2026-07-29  
Context: Deno Deploy project was removed during a platform migration; poke-api needed a new home for iPhone widgets.

## Locked decisions (grilling)

- One app, one Worker at repo root (C3 / Hono template); remove Deno/Oak/Lume tooling.
- Keep API surface: `GET /pokemon`, `GET /pokemon/potd`, `GET /pokemon/:idOrName`, plus CORS. No migrate HTTP route.
- `GET /` returns a simple Hono JSX HTML page (not Lume).
- D1 table: `pokemon(id, name, detail)` — full JSON in `detail`. List/detail/POTD all return full detail.
- Runtime reads D1 only. Images stay on existing public R2 URLs inside JSON.
- Seed via CLI only: inventory from `index.json`, details from `{id}.json` in the `pokeapi` R2 bucket.
- POTD: Workers cron `0 0 * * *` UTC; store `potd_id` in `meta`; pool size from D1, not hardcoded 905.
- Worker name `poke-api`; ship on `*.workers.dev`; GitHub Actions → Wrangler deploy.

## Outcomes

- Live URL: `https://poke-api.anuragroy.workers.dev`
- D1 database name `poke-api` (id `b74c2f1f-1724-4452-9b44-e1ea1907a731`), seeded with 905 Pokémon.
- R2 bucket `pokeapi` holds JSON + webp images; public host `https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/`.
- Seed scripts: `npm run seed` (local D1), `npm run seed:remote` (remote D1).
- PR #6 merged to `main`.

## CI note (follow-up)

Post-merge deploy failed: missing GitHub Actions secret `CLOUDFLARE_API_TOKEN`. Use a scoped API token (Edit Cloudflare Workers template + D1/R2 as needed), not the Global API Key. Node 20 deprecation warnings on Actions: bump workflow to Node 24 and newer action majors.
