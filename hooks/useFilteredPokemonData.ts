import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useMemo } from 'react'

export const useFilteredPokemonData = (searchQuery: string, pokemonData: PokemonData[], activeFilters: string[]) => {
  return useMemo(() => {
    let filteredData = pokemonData || []

    if (activeFilters.includes('Favorites')) {
      filteredData = filteredData.filter((pokemon) => pokemon.isFavorite)
    }

    if (activeFilters.some((filter) => filter !== 'Favorites')) {
      filteredData = filteredData.filter((pokemon) => pokemon.types.some((type) => activeFilters.includes(type)))
    }

    if (searchQuery) {
      filteredData = filteredData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filteredData
  }, [searchQuery, pokemonData, activeFilters])
}
