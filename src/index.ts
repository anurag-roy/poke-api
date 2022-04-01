import { Application } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import PokemonRouter from './routes/pokemon.route.ts';

const app = new Application();

app.use(oakCors());

app.use(async (context, next) => {
  try {
    await context.send({
      root: `${Deno.cwd()}/_site`,
      index: 'index.html',
    });
  } catch {
    next();
  }
});

app.use(PokemonRouter.routes(), PokemonRouter.allowedMethods());

app.listen({ port: 80 });
