import { getQuery } from 'oak/helpers.ts';
import { RouterMiddleware } from 'oak/mod.ts';
import { Pokemon, PokemonOfTheDay } from '../models/pokemon.ts';

export const getPokemon: RouterMiddleware<
  '/',
  { offset?: string; limit?: string }
> = async (context) => {
  const DEFAULT_OFFSET = 1;
  const DEFAULT_LIMIT = 150;

  const params = getQuery(context);
  const offset = Number(params.offset) || DEFAULT_OFFSET;
  const limit = Number(params.limit) || DEFAULT_LIMIT;

  try {
    const kv = await Deno.openKv();
    const pokemonIterator = kv.list<Pokemon>({
      start: ['pokemon', offset],
      end: ['pokemon', offset + limit],
    });

    const pokemon: Pokemon[] = [];
    for await (const p of pokemonIterator) pokemon.push(p.value);

    context.response.body = pokemon;
  } catch (error) {
    console.log(error);
    context.throw(500, 'Internal server error');
  }
};

export const getPokemonDetail: RouterMiddleware<'/:idOrName'> = async (
  context,
) => {
  const idOrName = Number.isNaN(Number(context.params.idOrName))
    ? decodeURIComponent(context.params.idOrName!).toLowerCase()
    : Number(context.params.idOrName);

  try {
    const kv = await Deno.openKv();
    const { value } = await kv.get<Pokemon>([
      typeof idOrName === 'number' ? 'pokemon' : 'pokemon_by_name',
      idOrName,
    ]);
    context.response.body = value;
    kv.close();
  } catch (error) {
    console.log(error);
    context.throw(500, 'Internal server error');
  }

  if (!context.response.body) {
    context.throw(404, 'Pokemon not found!');
  }
};

export const getPokemonOfTheDay: RouterMiddleware<'/potd'> = async (
  context,
) => {
  const pool = 905;
  const todaysDate = new Date().toDateString();

  try {
    const kv = await Deno.openKv();
    const { value } = await kv.get<PokemonOfTheDay>(['potd']);
    if (value && value.date === todaysDate) {
      context.response.body = value.pokemon;
      kv.close();
    } else {
      const randomNumber = Math.ceil(Math.random() * pool);
      const { value: pokemonData } = await kv.get<Pokemon>([
        'pokemon',
        randomNumber,
      ]);
      await kv.set(['potd'], {
        pokemon: pokemonData,
        date: todaysDate,
      });
      context.response.body = pokemonData;
      kv.close();
    }
  } catch (error) {
    console.log(error);
    context.throw(500, 'Internal server error');
  }
};

export const migratePokemonToKv: RouterMiddleware<'/migrate'> = async (
  context,
) => {
  const body = context.request.body({ type: 'json' });
  const { id } = await body.value;

  const p: Pokemon = JSON.parse(
    await Deno.readTextFile(`assets/data/${id}.json`),
  );

  const primaryKey = ['pokemon', p.id];
  const byName = ['pokemon_by_name', p.name.toLowerCase()];

  const kv = await Deno.openKv();
  const res = await kv
    .atomic()
    .check({ key: primaryKey, versionstamp: null })
    .check({ key: byName, versionstamp: null })
    .set(primaryKey, p)
    .set(byName, p)
    .commit();

  if (!res.ok) {
    throw new TypeError('Pokemon with id or name already exists');
  }

  context.response.body = 'Success!';
};
