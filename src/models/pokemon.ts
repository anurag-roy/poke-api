export interface PokemonBase {
    id: number;
    name: string;
    genus: string;
    description: string;
    types: string[];
    imageUrl: string;
}

export interface Pokemon extends PokemonBase {
    abilities: {
        name: string;
        effect: string;
        description: string;
    }[];
    stats: Record<string, number>;
    locations: string[];
}
