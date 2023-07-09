export type Pokemon = {
  id: number;
  name: string;
  genus: string;
  description: string;
  types: string[];
  imageUrl: string;
  /**
   * Hex code for the most dominant color in the image.
   */
  color: string;
  abilities: {
    name: string;
    effect: string;
    description: string;
  }[];
  stats: Record<string, number>;
  locations: string[];
};

export type PokemonOfTheDay = {
  pokemon: Pokemon;
  date: string;
};
