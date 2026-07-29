import { homeStyles } from './home-styles';

export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="A dead simple Pokédex API on Cloudflare Workers + D1. Try endpoints live in the playground."
        />
        <title>Pokédex API</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preload" href="/logo.webp" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
        <style>{homeStyles}</style>
      </head>
      <body>
        <header class="hero">
          <div class="pokeball" aria-hidden="true" />
          <div class="hero-inner">
            <div class="brand-row">
              <img src="/logo.webp" width="52" height="52" alt="" />
            </div>
            <h1 class="brand">Pokédex API</h1>
            <p class="lede">
              A dead simple Pokédex HTTP API on Cloudflare Workers + D1 — built
              for widgets and quick lookups.
            </p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#playground">
                Open playground
              </a>
              <a
                class="btn btn-ghost"
                href="https://github.com/anurag-roy/poke-api"
                rel="noreferrer"
                target="_blank"
              >
                View source
              </a>
            </div>
          </div>
        </header>

        <main>
          <section class="section" id="playground" aria-labelledby="playground-title">
            <div class="section-head">
              <h2 id="playground-title">API playground</h2>
              <p>
                Fire live requests against this Worker. Pick an endpoint, tweak
                params, and inspect the JSON response.
              </p>
            </div>

            <form class="playground" id="playground-form">
              <div class="play-controls">
                <div
                  class="tabs"
                  id="endpoint-tabs"
                  role="tablist"
                  aria-label="Endpoints"
                ></div>

                <div class="url-bar" aria-live="polite">
                  <span class="method" id="req-method">
                    GET
                  </span>
                  <span class="url-path mono" id="req-path">
                    /pokemon?offset=1&amp;limit=5
                  </span>
                </div>

                <div class="params" id="params"></div>

                <div class="send-row">
                  <span class="hint-kbd">
                    <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd>
                  </span>
                  <button class="btn-send" id="send" type="submit">
                    Send request
                  </button>
                </div>
              </div>

              <div class="play-response" aria-live="polite">
                <div class="res-toolbar">
                  <p class="res-toolbar-title">Response</p>
                  <div class="res-meta-row">
                    <span class="status-pill" id="res-status">
                      —
                    </span>
                    <span id="res-meta">Ready</span>
                  </div>
                </div>
                <div class="preview" id="res-preview" hidden></div>
                <pre class="res-body" id="res-body"></pre>
              </div>
            </form>
          </section>
        </main>

        <footer class="footer">
          <span>Cloudflare Workers · Hono · D1</span>
          <a href="https://github.com/anurag-roy/poke-api" rel="noreferrer">
            anurag-roy/poke-api
          </a>
        </footer>

        <script type="module" src="/playground.js"></script>
      </body>
    </html>
  );
}
