import { RouterMiddleware } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { Pokemon, PokemonBase } from '../models/pokemon.ts';

export const getPokemon: RouterMiddleware = async (context) => {
    const pokemon: PokemonBase[] = JSON.parse(await Deno.readTextFile('assets/data/index.json'));
    context.response.body = pokemon;
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
