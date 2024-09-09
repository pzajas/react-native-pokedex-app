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
  | 'default'

export interface PokemonData {
  id: number
  image: string
  name: string
  stats: PokemonStats
  types: string[]
  species: PokemonSpecies[]
}

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
  types: PokemonTypeDetail[]
  sprites: {
    front_default: string
  }
  stats: PokemonStats[]
}

export interface StatsAccumulator {
  [key: string]: number
}
