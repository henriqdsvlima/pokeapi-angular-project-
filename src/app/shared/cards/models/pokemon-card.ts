import { PokemonAbility } from "./pokemon-ability";
import { IPokemonRegion } from "./pokemon-region";
import { PokemonSprites } from "./pokemon-sprites";
import { PokemonStat } from "./pokemon-stats";
import { PokemonType } from "./pokemon-type";

export interface IPokemonCard {
  id: number;
  name: string;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
  region?: IPokemonRegion[];
}
