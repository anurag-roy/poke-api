export interface Pokemon {
    id: number;
    name: string;
    genus: string;
    description: string;
    types: string[];
    abilities: {
        name: string;
        effect: string;
        description: string;
    }[];
    stats: Record<string, number>;
    locations: string[];
}
