import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useMemo } from 'react'

export const useFilteredPokemonData = (searchQuery: string, pokemonData: PokemonData[], activeFilters: string[]) => {
  return useMemo(() => {
    let filteredData = pokemonData

    if (searchQuery) {
      filteredData = filteredData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    if (activeFilters.length > 0) {
      filteredData = filteredData.filter((pokemon) => pokemon.types.some((type) => activeFilters.includes(type)))
    }

    return filteredData
  }, [searchQuery, pokemonData, activeFilters])
}
