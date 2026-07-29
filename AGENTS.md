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
