A dead simple Pokédex API. The data was prepared from [PokéAPI's api-data](https://github.com/PokeAPI/api-data) using this simple [script](https://gist.github.com/anurag-roy/6b39fff1cfe89fcf7132e95b6ac66de1). Also all the images are in `.webp` to speed things up a bit.

## Why

1. This started out as an API to just test out [Deno Deploy](https://deno.com/deploy/).
2. Now, it's just my defacto API when trying out some new frontend tool/framework.

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
  {
    "id": 150,
    "name": "Mewtwo",
    "genus": "Genetic Pokémon",
    "description": "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
    "imageUrl": "https://raw.githubusercontent.com/anurag-roy/poke-api/main/assets/images/150.webp",
    "types": [
      "Psychic"
    ],
    "color":"#ded9e3"
  },
  {
    "id": 151,
    "name": "Mew",
    "genus": "New Species Pokémon",
    "description": "So rare that it is still said to be a mirage by many experts. Only a few people have seen it worldwide.",
    "imageUrl": "https://raw.githubusercontent.com/anurag-roy/poke-api/main/assets/images/151.webp",
    "types": [
      "Psychic"
    ],
    "color":"#eec3cd"
  }
  ```
</details>

#### Get Pokémon by National Pokédex Index

```http
GET /pokemon/${id}
```

| Parameter | Type     | Description            |
| :-------- | :------- | :--------------------- |
| `id`      | `number` | Id of Pokémon to fetch |

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
    "imageUrl": "https://raw.githubusercontent.com/anurag-roy/poke-api/main/assets/images/150.webp",
    "types": [
      "Psychic"
    ],
    "abilities": [
      {
        "name": "Pressure",
        "effect": "Moves targetting this Pokémon use one extra PP.  This ability stacks if multiple targets have it.  This ability still affects moves that fail or miss.  This ability does not affect ally moves that target either the entire field or just its side, nor this Pokémon's self-targetted moves; it does, however, affect single-targetted ally moves aimed at this Pokémon, ally moves that target all other Pokémon, and opponents' moves that target the entire field.  If this ability raises a move's PP cost above its remaining PP, it will use all remaining PP.  When this Pokémon enters battle, all participating trainers are notified that it has this ability.  Overworld: If the lead Pokémon has this ability, higher-levelled Pokémon have their encounter rate increased.",
        "description": "Raises foe’s PP usage."
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
    "locations": [
      "Cerulean Cave"
    ],
    "color":"#ded9e3"
  }
  ```
</details>

---

## Additional Resources

-   [PokéAPI pokémon data including sprites and official artwork](https://github.com/PokeAPI/api-data)
-   [Gist to create custom pokémon data](https://gist.github.com/anurag-roy/6b39fff1cfe89fcf7132e95b6ac66de1)
-   [Gist to convert images to .webp](https://gist.github.com/anurag-roy/86f312125bf76f0b93c10492c162b26f)
-   [Extract dominant color from images](https://github.com/anurag-roy/get-dominant-color)
-   [Deno Deploy Docs](https://deno.com/deploy/docs/)
