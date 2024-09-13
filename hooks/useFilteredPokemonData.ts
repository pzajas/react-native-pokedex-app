import { useMemo } from 'react'
interface PokemonData {
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

export const useFilteredPokemonData = (searchQuery: string, pokemonData: PokemonData[]) => {
  return useMemo(() => {
    if (!searchQuery) return pokemonData
    return pokemonData.filter((pokemon) => pokemon.pokemonName.includes(searchQuery.toLowerCase()))
  }, [searchQuery, pokemonData])
}
