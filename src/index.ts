import { Application, Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { Pokemon } from './models/pokemon.ts';

const app = new Application();
const router = new Router();

router.get('/', async (context) => {
    const pokemon: Pokemon[] = JSON.parse(await Deno.readTextFile('assets/data/index.json'));
    context.response.body = pokemon;
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({});
