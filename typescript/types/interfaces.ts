export interface PokemonListCardProps {
  pokemon: {
    pokemonName: string
    pokemonNameCapitalized: string
    url: string
    id: number
    pokemonExtendedId: string
    pokemonSimpleId: number
    artworkUrl: string
    pokemonBackgroundColor: string
    pokemonChipColor: string
    types: {
      type: string
      chipColor: string
      backgroundColor: string
    }[]
  }
  handleNavigatePokemon?: (item: any) => void
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
