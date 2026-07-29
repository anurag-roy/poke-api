<div align="center">

<img src="/assets/logo/logo.webp" width="140" title="Pokédex API Logo" />

A dead simple Pokédex API powered by Cloudflare Workers + D1.

</div>

---

## API Reference

#### Get all Pokémon

```http
GET /pokemon
```

| Parameter | Type     | Default | Description                     |
| :-------- | :------- | :------ | :------------------------------ |
| `limit`   | `number` | 150     | Number of objects to return.    |
| `offset`  | `number` | 1       | Id from which to start the list |

##### Examples

Endpoint: `/pokemon?offset=150&limit=2`

<details>
  <summary>Response body</summary>

```json
[
  {
    "id": 150,
    "name": "Mewtwo",
    "genus": "Genetic Pokémon",
    "description": "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
    "imageUrl": "https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/150.webp",
    "types": ["Psychic"],
    "abilities": [
      {
        "name": "Pressure",
        "effect": "Moves targetting this Pokémon use one extra PP.  This ability stacks if multiple targets have it.  This ability still affects moves that fail or miss.  This ability does not affect ally moves that target either the entire field or just its side, nor this Pokémon's self-targetted moves; it does, however, affect single-targetted ally moves aimed at this Pokémon, ally moves that target all other Pokémon, and opponents' moves that target the entire field.  If this ability raises a move's PP cost above its remaining PP, it will use all remaining PP.  When this Pokémon enters battle, all participating trainers are notified that it has this ability.  Overworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
        "description": "Raises foe's PP usage."
      },
      {
        "name": "Unnerve",
        "effect": "Opposing Pokémon cannot eat held Berries while this Pokémon is in battle.  Affected Pokémon can still use bug bite or pluck to eat a target's Berry.",
        "description": "Makes the foe nervous and unable to eat Berries."
      }
    ],
    "stats": {
      "HP": 106,
      "Attack": 110,
      "Defense": 90,
      "Special Attack": 154,
      "Special Defense": 90,
      "Speed": 130
    },
    "locations": ["Cerulean Cave"],
    "color": "#f1eff3"
  },
  {
    "id": 151,
    "name": "Mew",
    "genus": "New Species Pokémon",
    "description": "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.",
    "imageUrl": "https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/151.webp",
    "types": ["Psychic"],
    "abilities": [
      {
        "name": "Synchronize",
        "effect": "Whenever this Pokémon is burned, paralyzed, or poisoned, the Pokémon who gave this Pokémon that ailment is also given the ailment.  This ability passes back bad poison when this Pokémon is badly poisoned.  This ability cannot pass on a status ailment that the Pokémon did not directly receive from another Pokémon, such as the poison from toxic spikes or the burn from a flame orb.  Overworld: If the lead Pokémon has this ability, wild Pokémon have a 50% chance of having the lead Pokémon's nature, and a 50% chance of being given a random nature as usual, including the lead Pokémon's nature.  This does not work on Pokémon received outside of battle or roaming legendaries.",
        "description": "Passes on status problems."
      }
    ],
    "stats": {
      "HP": 100,
      "Attack": 100,
      "Defense": 100,
      "Special Attack": 100,
      "Special Defense": 100,
      "Speed": 100
    },
    "locations": ["Faraway Island"],
    "color": "#f8e7eb"
  }
]
```

</details>

---

#### Get Pokémon by National Pokédex Index

```http
GET /pokemon/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `number` | Id of the Pokémon to fetch |

##### Examples

Endpoint: `/pokemon/150`

<details>
  <summary>Response body</summary>

```json
{
  "id": 150,
  "name": "Mewtwo",
  "genus": "Genetic Pokémon",
  "description": "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
  "imageUrl": "https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/150.webp",
  "types": ["Psychic"],
  "abilities": [
    {
      "name": "Pressure",
      "effect": "Moves targetting this Pokémon use one extra PP.  This ability stacks if multiple targets have it.  This ability still affects moves that fail or miss.  This ability does not affect ally moves that target either the entire field or just its side, nor this Pokémon's self-targetted moves; it does, however, affect single-targetted ally moves aimed at this Pokémon, ally moves that target all other Pokémon, and opponents' moves that target the entire field.  If this ability raises a move's PP cost above its remaining PP, it will use all remaining PP.  When this Pokémon enters battle, all participating trainers are notified that it has this ability.  Overworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
      "description": "Raises foe's PP usage."
    },
    {
      "name": "Unnerve",
      "effect": "Opposing Pokémon cannot eat held Berries while this Pokémon is in battle.  Affected Pokémon can still use bug bite or pluck to eat a target's Berry.",
      "description": "Makes the foe nervous and unable to eat Berries."
    }
  ],
  "stats": {
    "HP": 106,
    "Attack": 110,
    "Defense": 90,
    "Special Attack": 154,
    "Special Defense": 90,
    "Speed": 130
  },
  "locations": ["Cerulean Cave"],
  "color": "#ded9e3"
}
```

</details>

---

#### Get Pokémon by name

```http
GET /pokemon/:name
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `name`    | `string` | Name of the Pokémon to fetch |

##### Examples

Endpoint: `/pokemon/gengar`

<details>
  <summary>Response body</summary>

```json
{
  "id": 94,
  "name": "Gengar",
  "genus": "Shadow Pokémon",
  "description": "Under a full moon, this POKéMON likes to mimic the shadows of people and laugh at their fright.",
  "imageUrl": "https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/94.webp",
  "types": ["Ghost", "Poison"],
  "abilities": [
    {
      "name": "Cursed Body",
      "effect": "Moves that hit this Pokémon have a 30% chance of being Disabled afterward.",
      "description": "May disable a move used on the Pokémon."
    }
  ],
  "stats": {
    "HP": 60,
    "Attack": 65,
    "Defense": 60,
    "Special Attack": 130,
    "Special Defense": 75,
    "Speed": 110
  },
  "locations": ["Old Chateau"],
  "color": "#cbc9da"
}
```

</details>

---

#### Get Pokémon of the Day

```http
GET /pokemon/potd
```

##### Examples

Endpoint: `/pokemon/potd`

<details>
  <summary>Sample Response body</summary>

```json
{
  "id": 150,
  "name": "Mewtwo",
  "genus": "Genetic Pokémon",
  "description": "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
  "imageUrl": "https://pub-460ada4f152c4135a7ec0881a2cb1330.r2.dev/150.webp",
  "types": ["Psychic"],
  "abilities": [
    {
      "name": "Pressure",
      "effect": "Moves targetting this Pokémon use one extra PP.  This ability stacks if multiple targets have it.  This ability still affects moves that fail or miss.  This ability does not affect ally moves that target either the entire field or just its side, nor this Pokémon's self-targetted moves; it does, however, affect single-targetted ally moves aimed at this Pokémon, ally moves that target all other Pokémon, and opponents' moves that target the entire field.  If this ability raises a move's PP cost above its remaining PP, it will use all remaining PP.  When this Pokémon enters battle, all participating trainers are notified that it has this ability.  Overworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
      "description": "Raises foe's PP usage."
    },
    {
      "name": "Unnerve",
      "effect": "Opposing Pokémon cannot eat held Berries while this Pokémon is in battle.  Affected Pokémon can still use bug bite or pluck to eat a target's Berry.",
      "description": "Makes the foe nervous and unable to eat Berries."
    }
  ],
  "stats": {
    "HP": 106,
    "Attack": 110,
    "Defense": 90,
    "Special Attack": 154,
    "Special Defense": 90,
    "Speed": 130
  },
  "locations": ["Cerulean Cave"],
  "color": "#ded9e3"
}
```

</details>

---

## Development

```bash
npm install
npm run db:migrate:local
npm run seed                 # load Pokémon from the pokeapi R2 bucket into local D1
npm run dev
```

Remote (production D1):

```bash
npm run db:migrate:remote
npm run seed:remote
npm run deploy
```

Pokémon of the Day is rotated daily at `00:00` UTC via a Workers Cron Trigger (pool size = D1 row count).

### Refreshing National Dex data (append)

Catalog size comes from R2 / D1, not a hardcoded constant. To generate **new** default National Dex entries after the ones already on R2 (historically through #905):

```bash
npm run generate:pokemon
```

This writes gitignored artifacts under `data/generated/`:

- `{id}.json` / `{id}.webp` for each new id
- `index.json` — full catalog (existing R2 index through #905 + new summaries)

Upload to the `pokeapi` R2 bucket (new objects + full `index.json`), then re-seed:

```bash
# Requires wrangler auth. Uploads every file in data/generated/ (incl. index.json).
for f in data/generated/*; do
  npx wrangler r2 object put "pokeapi/$(basename "$f")" --file="$f" --remote
done

npm run seed:remote
```

Ids **1–905** are left unchanged by the generator (append-only).

## Why

1. This started out as an API to test [Deno Deploy](https://deno.com/deploy/).
2. It now runs on [Cloudflare Workers](https://workers.cloudflare.com/) with [D1](https://developers.cloudflare.com/d1/) for storage.
3. It's my default API when trying out a new frontend tool/framework.

Original 1–905 data was prepared from [PokéAPI's api-data](https://github.com/PokeAPI/api-data) using this
[gist](https://gist.github.com/anurag-roy/6b39fff1cfe89fcf7132e95b6ac66de1). Newer entries are produced by
[`scripts/generate-pokemon.ts`](scripts/generate-pokemon.ts) (PokéAPI HTTP + official artwork → lightened
dominant-color background → WebP). Images are hosted on Cloudflare R2.

## Additional Resources

- [PokéAPI](https://pokeapi.co/) / [api-data](https://github.com/PokeAPI/api-data) / [sprites](https://github.com/PokeAPI/sprites)
- [Original gist to create custom pokémon data](https://gist.github.com/anurag-roy/6b39fff1cfe89fcf7132e95b6ac66de1)
- [Extract dominant color from images](https://github.com/anurag-roy/get-dominant-color)
- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)

## Credits

- Icon from [Flaticon](https://www.flaticon.com/free-icon/pokecoin_188926)
