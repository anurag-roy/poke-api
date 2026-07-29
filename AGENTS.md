# AGENTS.md — poke-api LLM Wiki schema

This repo maintains an **LLM Wiki** (see [Karpathy’s pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)). Agents own the wiki layer; humans curate sources and ask questions.

## Layers

| Layer | Path | Rules |
| --- | --- | --- |
| Raw sources | [`raw/`](raw/) | Immutable. Agents **read only** — never edit or delete. |
| Wiki | [`wiki/`](wiki/) | Agents **create and update** all pages here. |
| Schema | this file | Conventions and workflows. Co-evolve with the human. |

Primary code (`src/`, `wrangler.jsonc`, etc.) is the product. The wiki explains and accumulates knowledge *about* the product; it does not replace the code or README as runtime truth.

Also treat root [`README.md`](README.md) as a first-class source (do not copy it into `raw/` unless asked — link from wiki source pages instead).

## Wiki layout

```
wiki/
  index.md          # catalog of all wiki pages (update on every ingest/query-file)
  log.md            # append-only timeline
  overview.md       # living summary of the project
  entities/         # concrete things (Worker, D1, R2, CI, …)
  concepts/         # ideas, APIs, pipelines, tradeoffs
  sources/          # one summary page per ingested raw source
  queries/          # optional: filed answers worth keeping
```

## Page conventions

- Markdown only. Prefer `[[wiki-style]]` links *and* relative markdown links (`[text](../entities/foo.md)`).
- Optional YAML frontmatter:

  ```yaml
  ---
  title: Short title
  tags: [entity, cloudflare]
  updated: 2026-07-29
  sources: [raw/sources/example.md]
  ---
  ```

- Entity/concept pages: short definition, why it matters here, key facts, links to related pages, open questions.
- Source summary pages: what the source is, takeaways, which wiki pages it updated.
- Do not dump entire source files into the wiki — synthesize.

## Workflows

### Ingest

When the human adds or points at a new source under `raw/` (or asks to ingest root docs):

1. Read the source fully.
2. Discuss key takeaways if the human is in the loop; otherwise proceed.
3. Write/update `wiki/sources/<slug>.md`.
4. Update affected `wiki/entities/*` and `wiki/concepts/*` (and `overview.md` if needed).
5. Update `wiki/index.md`.
6. Append to `wiki/log.md`:

   `## [YYYY-MM-DD] ingest | Short title`

A single source may touch many pages — that is expected.

### Query

1. Read `wiki/index.md` first; open relevant pages.
2. Answer with citations to wiki pages (and raw sources when needed).
3. If the answer is reusable (comparison, decision, architecture note), file it under `wiki/queries/` or the right concept page, then update `index.md` and `log.md`:

   `## [YYYY-MM-DD] query | Short title`

### Lint

When asked to lint the wiki:

- Contradictions, stale claims vs code/README, orphans, missing concept pages, weak cross-links, gaps worth researching.
- Append `## [YYYY-MM-DD] lint | findings` to `log.md`.

## Domain focus (this repo)

Knowledge should stay centered on **poke-api**: a Pokédex HTTP API for iPhone widgets, now on Cloudflare Workers + Hono + D1, with Pokémon JSON/images in R2, seeded via CLI, POTD via cron.

Out of scope unless asked: general Pokémon lore encyclopedias, unrelated Cloudflare tutorials.

## Code vs wiki

- When code changes materially (API shape, schema, deploy URL, bindings), update the wiki in the same session if you made or reviewed those changes.
- Prefer linking to paths like `src/index.tsx` over pasting large code blocks.
- Secrets and tokens never go in the wiki.

## Cursor Cloud specific instructions

Local dev is a Cloudflare Worker run via `wrangler dev` (workerd/miniflare) with a **local** D1 SQLite DB under `.wrangler/` — no Cloudflare account/login is needed for local development or the CI `check`. Standard commands live in `package.json` and `README.md`; below are only the non-obvious caveats.

- One-time-per-VM data setup (the update script does NOT do this): after deps are installed, run `npm run db:migrate:local` then `npm run seed`. Local D1 state lives in `.wrangler/` (gitignored), so it does not persist across fresh VMs and must be re-created before `npm run dev` returns data.
- `npm run seed` fetches all ~1025 Pokémon over the network from the public R2 host (`pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev`) and shells out to `wrangler d1 execute`; it takes ~60s and requires outbound internet. It is idempotent (upserts).
- Run wrangler non-interactively with `CI=1` (it otherwise prompts for telemetry/migration confirmation). Start dev with an explicit port, e.g. `CI=1 npx wrangler dev --port 8787 --ip 127.0.0.1`.
- **Lint/typecheck:** there is no separate lint or test suite. The CI `check` is the typecheck + bundle dry-run: `npx wrangler deploy --dry-run --outdir=/tmp/poke-api-build`. Use it as the "does it compile/bundle" gate.
- To exercise the POTD cron write path locally, start dev with `--test-scheduled` and hit `http://127.0.0.1:8787/__scheduled?cron=0+0+*+*+*`; then re-check `/pokemon/potd`.
- `*:remote` scripts and `npm run deploy` require Cloudflare auth (`CLOUDFLARE_API_TOKEN`) and hit production D1/R2 — do not run them for local verification.
