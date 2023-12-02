import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import { Application } from 'https://deno.land/x/oak@v12.5.0/mod.ts';
import { setPokemonOfTheDay } from './controllers/pokemon.controller.ts';
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
    await next();
  }
});

app.use(PokemonRouter.routes(), PokemonRouter.allowedMethods());

app.listen({ port: 8000 });

Deno.cron('potd', '0 0 * * *', setPokemonOfTheDay);
