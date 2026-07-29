/**
 * Custom API playground — vanilla ES module.
 * Fits the plain Wrangler + Hono SSR setup (no Vite / hono/jsx/dom dual-build).
 */

const ENDPOINTS = [
  {
    id: 'list',
    label: 'List Pokémon',
    description: 'Paginate from a National Dex id.',
    method: 'GET',
    path: '/pokemon',
    query: [
      {
        name: 'offset',
        defaultValue: '1',
        placeholder: '1',
        hint: 'Starting National Dex id',
      },
      {
        name: 'limit',
        defaultValue: '5',
        placeholder: '5',
        hint: 'How many to return',
      },
    ],
  },
  {
    id: 'one',
    label: 'Get by id or name',
    description: 'Lookup a single Pokémon.',
    method: 'GET',
    pathTemplate: '/pokemon/:idOrName',
    pathParams: [
      {
        name: 'idOrName',
        defaultValue: 'pikachu',
        placeholder: '25 or pikachu',
        hint: 'National Dex id or name',
      },
    ],
  },
  {
    id: 'potd',
    label: 'Pokémon of the day',
    description: 'Today’s featured Pokémon.',
    method: 'GET',
    path: '/pokemon/potd',
  },
];

const els = {
  tabs: document.querySelector('#endpoint-tabs'),
  params: document.querySelector('#params'),
  method: document.querySelector('#req-method'),
  path: document.querySelector('#req-path'),
  send: document.querySelector('#send'),
  status: document.querySelector('#res-status'),
  meta: document.querySelector('#res-meta'),
  body: document.querySelector('#res-body'),
  preview: document.querySelector('#res-preview'),
  form: document.querySelector('#playground-form'),
};

/** @type {(typeof ENDPOINTS)[number]} */
let active = ENDPOINTS[0];
/** @type {Record<string, string>} */
let values = {};

function init() {
  if (!els.tabs || !els.form) return;

  els.tabs.innerHTML = ENDPOINTS.map(
    (ep, i) => `
      <button type="button" class="tab${i === 0 ? ' is-active' : ''}" data-id="${ep.id}" role="tab" aria-selected="${i === 0}">
        <span class="tab-label">${ep.label}</span>
        <span class="tab-desc">${ep.description}</span>
      </button>
    `,
  ).join('');

  els.tabs.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-id]');
    if (!btn) return;
    selectEndpoint(btn.dataset.id);
  });

  els.form.addEventListener('submit', (event) => {
    event.preventDefault();
    void sendRequest();
  });

  els.form.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
      event.preventDefault();
      void sendRequest();
    }
  });

  selectEndpoint(active.id);
  void sendRequest();
}

/**
 * @param {string} id
 */
function selectEndpoint(id) {
  active = ENDPOINTS.find((ep) => ep.id === id) ?? ENDPOINTS[0];
  values = {};

  for (const field of [...(active.query ?? []), ...(active.pathParams ?? [])]) {
    values[field.name] = field.defaultValue;
  }

  els.tabs.querySelectorAll('.tab').forEach((tab) => {
    const on = tab.dataset.id === active.id;
    tab.classList.toggle('is-active', on);
    tab.setAttribute('aria-selected', String(on));
  });

  renderParams();
  updateUrlPreview();
}

function renderParams() {
  const fields = [...(active.pathParams ?? []), ...(active.query ?? [])];

  if (fields.length === 0) {
    els.params.innerHTML =
      '<p class="params-empty">No parameters for this endpoint.</p>';
    return;
  }

  els.params.innerHTML = fields
    .map((field) => {
      const kind = active.pathParams?.some((p) => p.name === field.name)
        ? 'path'
        : 'query';
      return `
        <label class="field">
          <span class="field-top">
            <span class="field-name">${field.name}</span>
            <span class="field-kind">${kind}</span>
          </span>
          <input
            name="${field.name}"
            value="${escapeAttr(values[field.name] ?? '')}"
            placeholder="${escapeAttr(field.placeholder)}"
            autocomplete="off"
            spellcheck="false"
          />
          <span class="field-hint">${field.hint}</span>
        </label>
      `;
    })
    .join('');

  els.params.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => {
      values[input.name] = input.value;
      updateUrlPreview();
    });
  });
}

function buildUrl() {
  let path = active.path ?? active.pathTemplate ?? '/';

  for (const field of active.pathParams ?? []) {
    const raw = (values[field.name] ?? '').trim() || field.defaultValue;
    const encoded = encodeURIComponent(raw);
    path = path.replace(`:${field.name}`, encoded);
  }

  const params = new URLSearchParams();
  for (const field of active.query ?? []) {
    const raw = (values[field.name] ?? '').trim();
    if (raw !== '') params.set(field.name, raw);
  }

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

function updateUrlPreview() {
  const url = buildUrl();
  els.method.textContent = active.method;
  els.path.textContent = url;
  els.path.title = url;
}

async function sendRequest() {
  const url = buildUrl();
  updateUrlPreview();

  els.send.disabled = true;
  els.send.classList.add('is-loading');
  els.status.textContent = '…';
  els.status.className = 'status-pill is-pending';
  els.meta.textContent = 'Sending';
  els.body.textContent = '';
  els.preview.hidden = true;
  els.preview.innerHTML = '';
  els.body.classList.remove('is-pop');

  const started = performance.now();

  try {
    const res = await fetch(url, {
      headers: { Accept: 'application/json, text/plain, */*' },
    });
    const elapsed = Math.round(performance.now() - started);
    const text = await res.text();
    const contentType = res.headers.get('content-type') ?? '';

    let display = text;
    let parsed = null;

    if (contentType.includes('application/json')) {
      try {
        parsed = JSON.parse(text);
        display = JSON.stringify(parsed, null, 2);
      } catch {
        /* keep raw text */
      }
    }

    els.status.textContent = String(res.status);
    els.status.className = `status-pill ${res.ok ? 'is-ok' : 'is-err'}`;
    els.meta.textContent = `${elapsed} ms · ${formatBytes(text.length)}`;
    els.body.textContent = display || '(empty response)';
    requestAnimationFrame(() => els.body.classList.add('is-pop'));

    renderPreview(parsed);
  } catch (error) {
    const elapsed = Math.round(performance.now() - started);
    els.status.textContent = 'ERR';
    els.status.className = 'status-pill is-err';
    els.meta.textContent = `${elapsed} ms`;
    els.body.textContent =
      error instanceof Error ? error.message : 'Request failed';
    requestAnimationFrame(() => els.body.classList.add('is-pop'));
  } finally {
    els.send.disabled = false;
    els.send.classList.remove('is-loading');
  }
}

/**
 * @param {unknown} parsed
 */
function renderPreview(parsed) {
  const pokemon = pickPokemon(parsed);
  if (!pokemon?.imageUrl) {
    els.preview.hidden = true;
    els.preview.innerHTML = '';
    return;
  }

  const types = Array.isArray(pokemon.types)
    ? pokemon.types.map((t) => `<span class="type-chip">${escapeHtml(String(t))}</span>`).join('')
    : '';

  els.preview.hidden = false;
  els.preview.innerHTML = `
    <img src="${escapeAttr(pokemon.imageUrl)}" alt="${escapeAttr(pokemon.name ?? 'Pokémon')}" width="96" height="96" loading="lazy" />
    <div>
      <p class="preview-name">${escapeHtml(pokemon.name ?? 'Unknown')}</p>
      <p class="preview-genus">${escapeHtml(pokemon.genus ?? '')}</p>
      <div class="preview-types">${types}</div>
    </div>
  `;
  els.preview.style.setProperty('--poke-color', pokemon.color || '#e3350d');
}

/**
 * @param {unknown} data
 * @returns {{ name?: string, genus?: string, imageUrl?: string, types?: string[], color?: string } | null}
 */
function pickPokemon(data) {
  if (!data || typeof data !== 'object') return null;
  if (Array.isArray(data)) {
    return data.find((item) => item && typeof item === 'object' && 'imageUrl' in item) ?? null;
  }
  if ('imageUrl' in data) return data;
  return null;
}

/** @param {number} n */
function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}

/** @param {string} value */
function escapeAttr(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

/** @param {string} value */
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

init();
