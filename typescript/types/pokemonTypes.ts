export interface PokemonData {
  name: string
  extendedId: string
  shortenedId: number
  url: string
  isFavorite: boolean
  types: string[]
  chipColors: string[]
  backgroundColor: string
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
  species: {
    name: string
    url: string
  }
}

export type PokemonType =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | 'normal'

export type PokemonSpecies = { name: string }

export interface PokemonTypeDetail {
  type: {
    name: string
  }
}

export interface PokemonStats {
  stat: {
    name: string
  }
  base_stat: number
}
export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  abilities: { ability: { name: string } }[]
  types: { type: { name: string } }[]
  stats: { stat: { name: string }; base_stat: number }[]
  species: { name: string }
  gender_rate: number
  egg_groups: { name: string }[]
  base_happiness: number
  hatch_counter: number
}

export interface StatsAccumulator {
  [key: string]: number
}
