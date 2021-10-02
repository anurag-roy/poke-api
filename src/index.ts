import { Application, Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { Pokemon, PokemonBase } from './models/pokemon.ts';

const app = new Application();
const router = new Router();

router
    .get('/api/pokemon', async (context) => {
        const pokemon: PokemonBase[] = JSON.parse(
            await Deno.readTextFile('assets/data/index.json')
        );
        context.response.body = pokemon;
    })
    .get('/api/pokemon/:id', async (context) => {
        const id = context.params.id;
        try {
            const pokemon: Pokemon[] = JSON.parse(
                await Deno.readTextFile(`assets/data/${id}.json`)
            );
            context.response.body = pokemon;
        } catch (error) {
            console.log(error);
            context.throw(404, 'Pokemon not found!');
        }
    });

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({});
