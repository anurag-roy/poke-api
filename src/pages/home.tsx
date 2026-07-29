export function HomePage() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pokédex API</title>
        <style>{`
          :root {
            color-scheme: light;
            --ink: #1a1a1a;
            --muted: #5c5c5c;
            --bg: #f7f4ef;
            --accent: #e3350d;
            --code: #fff;
          }
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: 'IBM Plex Sans', 'Segoe UI', sans-serif;
            background:
              radial-gradient(circle at top left, #ffe8e0, transparent 40%),
              linear-gradient(180deg, #f7f4ef 0%, #efe8dc 100%);
            color: var(--ink);
            min-height: 100vh;
          }
          main {
            max-width: 44rem;
            margin: 0 auto;
            padding: 3.5rem 1.5rem 4rem;
          }
          h1 {
            font-size: clamp(2rem, 5vw, 2.75rem);
            letter-spacing: -0.03em;
            margin: 0 0 0.5rem;
          }
          p { color: var(--muted); line-height: 1.6; }
          code, pre {
            font-family: 'IBM Plex Mono', ui-monospace, monospace;
          }
          .endpoint {
            margin: 1.25rem 0;
            padding: 1rem 1.1rem;
            background: var(--code);
            border: 1px solid #e5ddd0;
            border-radius: 12px;
          }
          .endpoint strong { color: var(--accent); }
          a { color: var(--accent); }
        `}</style>
      </head>
      <body>
        <main>
          <h1>Pokédex API</h1>
          <p>
            A dead simple Pokédex API on Cloudflare Workers + D1. Built for
            widgets and quick lookups.
          </p>

          <div class="endpoint">
            <strong>GET</strong> <code>/pokemon?offset=1&amp;limit=150</code>
            <p>List Pokémon starting at a National Dex id.</p>
          </div>

          <div class="endpoint">
            <strong>GET</strong> <code>/pokemon/:idOrName</code>
            <p>Fetch one Pokémon by id or name.</p>
          </div>

          <div class="endpoint">
            <strong>GET</strong> <code>/pokemon/potd</code>
            <p>Pokémon of the day.</p>
          </div>

          <p>
            Source:{' '}
            <a href="https://github.com/anurag-roy/poke-api">anurag-roy/poke-api</a>
          </p>
        </main>
      </body>
    </html>
  );
}
