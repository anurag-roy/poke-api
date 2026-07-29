import { Hono } from 'hono';
import { cors } from 'hono/cors';
import {
  getPokemonByIdOrName,
  getPokemonOfTheDay,
  listPokemon,
  setPokemonOfTheDay,
} from './db';
import { HomePage } from './pages/home';
const app = new Hono<{ Bindings: CloudflareBindings }>();

app.use('*', cors());

app.get('/', (c) => c.html(<HomePage />));

app.get('/pokemon', async (c) => {
  const DEFAULT_OFFSET = 1;
  const DEFAULT_LIMIT = 150;

  const offset = Number(c.req.query('offset')) || DEFAULT_OFFSET;
  const limit = Number(c.req.query('limit')) || DEFAULT_LIMIT;

  try {
    const pokemon = await listPokemon(c.env.DB, offset, limit);
    return c.json(pokemon);
  } catch (error) {
    console.error(error);
    return c.text('Internal server error', 500);
  }
});

app.get('/pokemon/potd', async (c) => {
  try {
    const pokemon = await getPokemonOfTheDay(c.env.DB);
    return c.json(pokemon);
  } catch (error) {
    console.error(error);
    return c.text('Internal server error', 500);
  }
});

app.get('/pokemon/:idOrName', async (c) => {
  const raw = c.req.param('idOrName');
  const idOrName = Number.isNaN(Number(raw))
    ? decodeURIComponent(raw).toLowerCase()
    : Number(raw);

  try {
    const pokemon = await getPokemonByIdOrName(c.env.DB, idOrName);
    if (!pokemon) {
      return c.text('Pokemon not found!', 404);
    }
    return c.json(pokemon);
  } catch (error) {
    console.error(error);
    return c.text('Internal server error', 500);
  }
});

export default {
  fetch: app.fetch,
  async scheduled(
    _controller: ScheduledController,
    env: CloudflareBindings,
    ctx: ExecutionContext,
  ) {
    ctx.waitUntil(setPokemonOfTheDay(env.DB));
  },
};
