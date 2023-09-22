
export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}



export type PokemonTypeAPI  = Pick<PokemonType, 'type'>
