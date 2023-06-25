import { Router } from 'oak/mod.ts';
import {
  getPokemon,
  getPokemonDetail,
  getPokemonOfTheDay,
} from '../controllers/pokemon.controller.ts';

/**
 * Router for the routes starting with `pokemon/`
 */
const router = new Router({
  prefix: '/pokemon',
});

router.get('/', getPokemon);
router.get('/potd', getPokemonOfTheDay);
// router.post('/migrate', migratePokemonToKv);
router.get('/:idOrName', getPokemonDetail);

export default router;
