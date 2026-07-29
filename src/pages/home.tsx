import { PokeballSvg } from './pokeball';

export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Pokédex HTTP API on Cloudflare Workers + D1. Try endpoints in the playground."
        />
        <title>PokeAPI</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Served as a static asset — Hono JSX escapes quotes inside <style>, which breaks font-family. */}
        <link rel="stylesheet" href="/home.css" />
      </head>
      <body>
        <nav class="nav">
          <div class="shell nav-inner">
            <a class="brand" href="/">
              <PokeballSvg size={28} />
              <span>
                Poke<span class="accent">API</span>
              </span>
            </a>
            <div class="nav-links">
              <a href="#endpoints">Endpoints</a>
              <a href="#playground">Playground</a>
              <a
                class="nav-cta"
                href="https://github.com/anurag-roy/poke-api"
                rel="noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>

        <header class="hero">
          <div class="hero-grid" aria-hidden="true" />
          <div class="hero-equator" aria-hidden="true" />
          <div class="shell hero-layout">
            <div>
              <div class="eyebrow">
                <span class="eyebrow-line" />
                <span class="eyebrow-text">Cloudflare Workers · D1</span>
              </div>
              <h1>
                The <span class="accent">Pokédex</span>
                <br />
                API
              </h1>
              <p class="lede">
                Dead-simple Pokémon JSON for widgets and quick lookups. No auth.
                Hit it from the playground below.
              </p>
              <div class="cta-row">
                <a class="btn btn-primary" href="#playground">
                  Try the API
                </a>
                <a class="btn btn-ghost" href="#endpoints">
                  View endpoints
                </a>
              </div>
            </div>

            <div class="hero-visual">
              <div class="pokeball-wrap">
                <div class="pokeball-glow" aria-hidden="true" />
                <PokeballSvg size={220} spin />
              </div>
              <div class="terminal">
                <div class="terminal-bar">
                  <span class="dot dot-r" />
                  <span class="dot dot-y" />
                  <span class="dot dot-g" />
                  <span class="terminal-title">terminal</span>
                </div>
                <pre>
                  <code>
                    <span class="c-muted">$ </span>
                    <span class="c-primary">curl</span>
                    <span> /pokemon/</span>
                    <span class="c-str">pikachu</span>
                    {'\n'}
                    <span class="c-muted">{'{'}</span>
                    {'\n'}
                    <span class="c-muted">{'  '}</span>
                    <span class="c-key">"id"</span>
                    <span class="c-muted">: </span>
                    <span class="c-num">25</span>
                    <span class="c-muted">,</span>
                    {'\n'}
                    <span class="c-muted">{'  '}</span>
                    <span class="c-key">"name"</span>
                    <span class="c-muted">: </span>
                    <span class="c-str">"Pikachu"</span>
                    <span class="c-muted">,</span>
                    {'\n'}
                    <span class="c-muted">{'  '}</span>
                    <span class="c-key">"types"</span>
                    <span class="c-muted">: [</span>
                    <span class="c-str">"Electric"</span>
                    <span class="c-muted">],</span>
                    {'\n'}
                    <span class="c-muted">{'  ...'}</span>
                    {'\n'}
                    <span class="c-muted">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </header>

        <main>
          <section class="section" id="endpoints" aria-labelledby="endpoints-title">
            <div class="shell">
              <div class="section-head">
                <div class="eyebrow">
                  <span class="eyebrow-line" />
                  <span class="eyebrow-text">Reference</span>
                </div>
                <h2 id="endpoints-title">Endpoints</h2>
              </div>
              <div class="endpoint-list">
                <div class="endpoint-row">
                  <span class="method-tag">GET</span>
                  <div>
                    <code>/pokemon?offset=&amp;limit=</code>
                    <p>List from a starting National Dex id.</p>
                  </div>
                </div>
                <div class="endpoint-row">
                  <span class="method-tag">GET</span>
                  <div>
                    <code>/pokemon/:idOrName</code>
                    <p>One Pokémon by id or name.</p>
                  </div>
                </div>
                <div class="endpoint-row">
                  <span class="method-tag">GET</span>
                  <div>
                    <code>/pokemon/potd</code>
                    <p>Pokémon of the day.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            class="section"
            id="playground"
            aria-labelledby="playground-title"
          >
            <div class="shell">
              <div class="section-head">
                <div class="eyebrow">
                  <span class="eyebrow-line" />
                  <span class="eyebrow-text">Interactive</span>
                </div>
                <h2 id="playground-title">API playground</h2>
                <p>
                  Pick an endpoint, tweak params, fire a live request against
                  this Worker.
                </p>
              </div>

              <form class="playground" id="playground-form">
                <div class="play-controls">
                  <span class="panel-label">Select endpoint</span>
                  <div
                    class="tabs"
                    id="endpoint-tabs"
                    role="tablist"
                    aria-label="Endpoints"
                  ></div>

                  <div class="params-wrap">
                    <span class="panel-label params-heading">Parameters</span>
                    <div class="params" id="params"></div>

                    <div class="url-bar" aria-live="polite">
                      <div class="url-bar-label">Request URL</div>
                      <div class="url-bar-value">
                        <span class="method" id="req-method">
                          GET
                        </span>{' '}
                        <span id="req-path">/pokemon?offset=1&amp;limit=5</span>
                      </div>
                    </div>

                    <button class="btn-send" id="send" type="submit">
                      Send request
                    </button>
                    <p class="hint-kbd">
                      <kbd>⌘</kbd>/<kbd>Ctrl</kbd> + <kbd>Enter</kbd>
                    </p>
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
            </div>
          </section>
        </main>

        <footer class="footer">
          <div class="shell footer-inner">
            <span>Workers · Hono · D1</span>
            <a href="https://github.com/anurag-roy/poke-api" rel="noreferrer">
              anurag-roy/poke-api
            </a>
          </div>
        </footer>

        <script type="module" src="/playground.js"></script>
      </body>
    </html>
  );
}
