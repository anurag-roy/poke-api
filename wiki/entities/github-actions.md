---
title: GitHub Actions deploy
tags: [entity, ci]
updated: 2026-07-29
---

# GitHub Actions deploy

Workflow: [`.github/workflows/ci.yml`](../../.github/workflows/ci.yml).

## Jobs

1. **check** (PRs + pushes) — `npm ci`, `wrangler deploy --dry-run`
2. **deploy** (push to `main` only) — `cloudflare/wrangler-action` with `deploy --minify`

## Auth

Deploy requires repo secret **`CLOUDFLARE_API_TOKEN`**: a scoped Cloudflare API token (prefer **Edit Cloudflare Workers** template, plus D1/R2 as needed). Do **not** use the Global API Key.

If the secret is missing, deploy fails with a non-interactive Wrangler auth error (seen after merging PR #6).

## Related

- [poke-api Worker](poke-api-worker.md)
- Migration notes: [source summary](../sources/2026-07-29-cloudflare-migration.md)
