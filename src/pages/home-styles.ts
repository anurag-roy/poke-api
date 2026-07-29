/** Homepage styles — Pokéball-inspired red & white, kept restrained. */
export const homeStyles = `
  :root {
    color-scheme: light;
    --red: #e3350d;
    --red-deep: #b42300;
    --red-soft: #fff1ee;
    --ink: #141414;
    --muted: #5f5f5f;
    --line: #e7e7e7;
    --panel: #ffffff;
    --bg: #f6f6f6;
    --shadow: 0 18px 50px rgba(20, 20, 20, 0.08);
    --radius: 18px;
    --font: 'Figtree', 'Segoe UI', sans-serif;
    --display: 'Syne', 'Figtree', sans-serif;
    --mono: 'JetBrains Mono', ui-monospace, monospace;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body {
    margin: 0;
    font-family: var(--font);
    color: var(--ink);
    background: var(--bg);
    min-height: 100vh;
  }
  a { color: var(--red); text-underline-offset: 0.18em; }
  button, input { font: inherit; }
  code, pre, .mono { font-family: var(--mono); }

  /* —— Hero —— */
  .hero {
    position: relative;
    isolation: isolate;
    min-height: min(92vh, 46rem);
    display: grid;
    place-items: end stretch;
    overflow: hidden;
    color: var(--ink);
    background:
      radial-gradient(ellipse 70% 55% at 80% 20%, rgba(227, 53, 13, 0.18), transparent 55%),
      linear-gradient(180deg, #ffffff 0%, #ffffff 48%, var(--red) 48.15%, #c12c0a 100%);
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(20, 20, 20, 0.05) 1px, transparent 1px);
    background-size: 22px 22px;
    mask-image: linear-gradient(180deg, #000 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
  .pokeball {
    position: absolute;
    right: max(-4rem, 4vw);
    top: 50%;
    width: min(52vw, 28rem);
    aspect-ratio: 1;
    border-radius: 50%;
    background:
      linear-gradient(180deg, var(--red) 0 49.5%, #1a1a1a 49.5% 50.5%, #fff 50.5% 100%);
    box-shadow:
      0 0 0 10px rgba(255, 255, 255, 0.35),
      0 30px 80px rgba(180, 35, 0, 0.28);
    transform: translateY(-50%) rotate(-4deg);
    animation: float-ball 7s ease-in-out infinite;
    z-index: 1;
  }
  .pokeball::before {
    content: '';
    position: absolute;
    inset: 50% auto auto 50%;
    translate: -50% -50%;
    width: 22%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: #fff;
    border: 10px solid #1a1a1a;
    box-shadow: inset 0 0 0 8px #fff, inset 0 0 0 14px #d0d0d0;
  }
  .hero-inner {
    position: relative;
    z-index: 2;
    width: min(72rem, calc(100% - 2rem));
    margin: 0 auto;
    padding: 4.5rem 0 3.25rem;
    display: grid;
    gap: 1.25rem;
    max-width: 36rem;
    justify-self: start;
    margin-left: max(1rem, calc((100% - 72rem) / 2 + 1rem));
  }
  @media (max-width: 800px) {
    .hero {
      min-height: auto;
      background:
        radial-gradient(ellipse 90% 40% at 50% 0%, rgba(227, 53, 13, 0.16), transparent 55%),
        linear-gradient(180deg, #fff 0%, #fff 62%, var(--red) 62.1%, #c12c0a 100%);
      place-items: start stretch;
    }
    .pokeball {
      right: -18%;
      top: 12%;
      width: min(70vw, 16rem);
      opacity: 0.9;
      transform: rotate(-4deg);
      animation-name: float-ball-mobile;
    }
    .hero-inner {
      margin: 0 auto;
      padding: 5.5rem 0 2.75rem;
      max-width: 40rem;
      width: min(40rem, calc(100% - 2rem));
    }
  }
  .brand-row {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    animation: rise 0.7s ease both;
  }
  .brand-row img {
    width: 3.25rem;
    height: 3.25rem;
    border-radius: 18%;
    background: #fff;
    box-shadow: 0 8px 24px rgba(20, 20, 20, 0.12);
  }
  .brand {
    font-family: var(--display);
    font-weight: 800;
    font-size: clamp(2.6rem, 8vw, 4.4rem);
    line-height: 0.95;
    letter-spacing: -0.04em;
    margin: 0;
    animation: rise 0.75s ease 0.05s both;
  }
  .lede {
    margin: 0;
    font-size: clamp(1.05rem, 2.4vw, 1.25rem);
    line-height: 1.55;
    color: var(--muted);
    max-width: 28rem;
    animation: rise 0.75s ease 0.12s both;
  }
  .cta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.35rem;
    animation: rise 0.75s ease 0.18s both;
  }
  .btn {
    appearance: none;
    border: 0;
    border-radius: 999px;
    padding: 0.85rem 1.35rem;
    font-weight: 700;
    letter-spacing: -0.01em;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: transform 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
  }
  .btn:hover { transform: translateY(-1px); }
  .btn:active { transform: translateY(0); }
  .btn-primary {
    background: var(--ink);
    color: #fff;
    box-shadow: 0 10px 28px rgba(20, 20, 20, 0.18);
  }
  .btn-primary:hover { background: #000; }
  .btn-ghost {
    background: rgba(255, 255, 255, 0.72);
    color: var(--ink);
    border: 1px solid rgba(20, 20, 20, 0.08);
    backdrop-filter: blur(8px);
  }

  /* —— Section shell —— */
  .section {
    width: min(72rem, calc(100% - 2rem));
    margin: 0 auto;
    padding: 3.5rem 0 1rem;
  }
  .section-head {
    display: grid;
    gap: 0.45rem;
    margin-bottom: 1.5rem;
    max-width: 36rem;
  }
  .section-head h2 {
    font-family: var(--display);
    font-size: clamp(1.8rem, 4vw, 2.4rem);
    letter-spacing: -0.03em;
    margin: 0;
  }
  .section-head p {
    margin: 0;
    color: var(--muted);
    line-height: 1.55;
  }

  /* —— Playground —— */
  .playground {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
    gap: 1rem;
    background: var(--panel);
    border: 1px solid var(--line);
    border-radius: calc(var(--radius) + 4px);
    box-shadow: var(--shadow);
    overflow: hidden;
    min-height: 32rem;
  }
  @media (max-width: 900px) {
    .playground { grid-template-columns: 1fr; min-height: 0; }
  }
  .play-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.15rem;
    border-right: 1px solid var(--line);
    background:
      linear-gradient(180deg, var(--red-soft), transparent 8rem),
      #fff;
  }
  @media (max-width: 900px) {
    .play-controls { border-right: 0; border-bottom: 1px solid var(--line); }
  }
  .tabs {
    display: grid;
    gap: 0.5rem;
  }
  .tab {
    text-align: left;
    border: 1px solid var(--line);
    background: #fff;
    border-radius: 14px;
    padding: 0.8rem 0.95rem;
    cursor: pointer;
    display: grid;
    gap: 0.15rem;
    transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease;
  }
  .tab:hover { border-color: #f0b4a8; transform: translateY(-1px); }
  .tab.is-active {
    border-color: var(--red);
    background: linear-gradient(180deg, #fff, var(--red-soft));
    box-shadow: inset 3px 0 0 var(--red);
  }
  .tab-label { font-weight: 700; letter-spacing: -0.01em; }
  .tab-desc { color: var(--muted); font-size: 0.88rem; }

  .url-bar {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 0.65rem;
    padding: 0.7rem 0.8rem;
    border-radius: 14px;
    border: 1px solid var(--line);
    background: #fff;
  }
  .method {
    font-family: var(--mono);
    font-size: 0.78rem;
    font-weight: 500;
    color: #fff;
    background: var(--red);
    padding: 0.28rem 0.5rem;
    border-radius: 8px;
    letter-spacing: 0.04em;
  }
  .url-path {
    font-family: var(--mono);
    font-size: 0.86rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--ink);
  }

  .params { display: grid; gap: 0.75rem; }
  .params-empty {
    margin: 0;
    color: var(--muted);
    font-size: 0.92rem;
    padding: 0.35rem 0.1rem;
  }
  .field { display: grid; gap: 0.35rem; }
  .field-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.5rem;
  }
  .field-name {
    font-family: var(--mono);
    font-size: 0.82rem;
    font-weight: 500;
  }
  .field-kind {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--muted);
  }
  .field input {
    width: 100%;
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 0.7rem 0.8rem;
    background: #fff;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .field input:focus {
    outline: none;
    border-color: var(--red);
    box-shadow: 0 0 0 3px rgba(227, 53, 13, 0.12);
  }
  .field-hint { color: var(--muted); font-size: 0.8rem; }

  .send-row {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  .hint-kbd {
    color: var(--muted);
    font-size: 0.8rem;
  }
  .hint-kbd kbd {
    font-family: var(--mono);
    font-size: 0.72rem;
    border: 1px solid var(--line);
    border-bottom-width: 2px;
    border-radius: 6px;
    padding: 0.1rem 0.35rem;
    background: #fff;
  }
  .btn-send {
    background: var(--red);
    color: #fff;
    border: 0;
    border-radius: 12px;
    padding: 0.8rem 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    transition: background 0.15s ease, transform 0.15s ease;
  }
  .btn-send:hover { background: var(--red-deep); transform: translateY(-1px); }
  .btn-send:disabled { opacity: 0.7; cursor: wait; transform: none; }
  .btn-send.is-loading::after {
    content: '';
    width: 0.7rem;
    height: 0.7rem;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  .play-response {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background:
      linear-gradient(180deg, #1b1b1b, #111 40%),
      #111;
    color: #f3f3f3;
  }
  .res-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .res-toolbar-title {
    font-size: 0.78rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin: 0;
  }
  .res-meta-row {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    font-family: var(--mono);
    font-size: 0.78rem;
    color: rgba(255,255,255,0.55);
  }
  .status-pill {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 2.4rem;
    padding: 0.15rem 0.45rem;
    border-radius: 999px;
    font-weight: 500;
    background: rgba(255,255,255,0.08);
    color: #fff;
  }
  .status-pill.is-ok { background: rgba(46, 204, 113, 0.18); color: #7dffa8; }
  .status-pill.is-err { background: rgba(227, 53, 13, 0.22); color: #ffb4a4; }
  .status-pill.is-pending { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }

  .preview {
    display: flex;
    gap: 0.85rem;
    align-items: center;
    margin: 0.9rem 1rem 0;
    padding: 0.75rem 0.85rem;
    border-radius: 14px;
    background: color-mix(in srgb, var(--poke-color, var(--red)) 22%, #1a1a1a);
    border: 1px solid rgba(255,255,255,0.08);
    animation: rise 0.35s ease both;
  }
  .preview img {
    width: 4.5rem;
    height: 4.5rem;
    object-fit: contain;
    background: rgba(255,255,255,0.06);
    border-radius: 12px;
  }
  .preview-name {
    margin: 0;
    font-weight: 700;
    font-size: 1.05rem;
    letter-spacing: -0.02em;
  }
  .preview-genus {
    margin: 0.15rem 0 0.4rem;
    color: rgba(255,255,255,0.65);
    font-size: 0.85rem;
  }
  .preview-types { display: flex; flex-wrap: wrap; gap: 0.35rem; }
  .type-chip {
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    background: rgba(255,255,255,0.12);
  }

  .res-body {
    flex: 1;
    margin: 0;
    padding: 1rem;
    overflow: auto;
    font-family: var(--mono);
    font-size: 0.8rem;
    line-height: 1.55;
    color: #e8e8e8;
    white-space: pre-wrap;
    word-break: break-word;
    min-height: 16rem;
  }
  .res-body.is-pop { animation: rise 0.35s ease both; }
  .res-body:empty::before {
    content: 'Hit Send to fire a request against this Worker.';
    color: rgba(255,255,255,0.4);
  }

  /* —— Footer —— */
  .footer {
    width: min(72rem, calc(100% - 2rem));
    margin: 0 auto;
    padding: 2.5rem 0 3rem;
    color: var(--muted);
    font-size: 0.92rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    justify-content: space-between;
    border-top: 1px solid var(--line);
    margin-top: 2.5rem;
  }

  @keyframes float-ball {
    0%, 100% { transform: translateY(-50%) rotate(-4deg); }
    50% { transform: translateY(calc(-50% - 10px)) rotate(3deg); }
  }
  @keyframes float-ball-mobile {
    0%, 100% { transform: rotate(-4deg); }
    50% { transform: translateY(-8px) rotate(3deg); }
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
