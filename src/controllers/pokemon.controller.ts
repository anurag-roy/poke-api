import { RouterMiddleware } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import seedrandom from 'https://esm.sh/v86/seedrandom@3.0.5/es2022/seedrandom.min.js';
import { Pokemon, PokemonBase } from '../models/pokemon.ts';

export const getPokemon: RouterMiddleware = async (context) => {
    const DEFAULT_OFFSET = 1;
    const DEFAULT_LIMIT = 150;

    const params = context.request.url.searchParams;
    const offset = Number(params.get('offset')) || DEFAULT_OFFSET;
    const limit = Number(params.get('limit')) || DEFAULT_LIMIT;

    const pokemon: PokemonBase[] = JSON.parse(await Deno.readTextFile('assets/data/index.json'));
    context.response.body = pokemon.slice(offset - 1, offset - 1 + limit);
};

export const getPokemonDetail: RouterMiddleware<{ id: string }> = async (context) => {
    const id = context.params.id;
    try {
        const pokemon: Pokemon[] = JSON.parse(await Deno.readTextFile(`assets/data/${id}.json`));
        context.response.body = pokemon;
    } catch (error) {
        console.log(error);
        context.throw(404, 'Pokemon not found!');
    }
};

export const getPokemonOfTheDay: RouterMiddleware = async (context) => {
    const MAX_POKEMON_POOL = 905;
    const DEFAULT_POKEMON_POOL = MAX_POKEMON_POOL;
    const poolInParams = context.request.url.searchParams.get('pool');
    const pool = Math.min(
      Number(poolInParams) || DEFAULT_POKEMON_POOL,
      MAX_POKEMON_POOL
    );

    const todaysDate = new Date().toDateString();
    const rng = new seedrandom(todaysDate);
    const pokemonId = Math.round(rng() * pool);

    const pokemon: Pokemon[] = JSON.parse(await Deno.readTextFile(`assets/data/${pokemonId}.json`));
    context.response.body = pokemon;
};
