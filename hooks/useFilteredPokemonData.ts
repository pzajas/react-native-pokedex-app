import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useEffect, useMemo } from 'react'

export const useFilteredPokemonData = (
  searchQuery: string,
  pokemonData: PokemonData[],
  activeFilters: string[],
  favoritePokemons: PokemonData[],
  refetchFavorites: () => void
) => {
  useEffect(() => {
    if (activeFilters.includes('Favorites')) {
      refetchFavorites()
    }
  }, [activeFilters, refetchFavorites])

  return useMemo(() => {
    let filteredData = pokemonData || []

    if (activeFilters.includes('Favorites')) {
      filteredData = favoritePokemons
    }

    if (activeFilters.some((filter) => filter !== 'Favorites')) {
      filteredData = filteredData.filter((pokemon) => pokemon.types.some((type) => activeFilters.includes(type)))
    }

    if (searchQuery) {
      filteredData = filteredData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    return filteredData.sort((a: PokemonData, b: PokemonData) => Number(a.extendedId) - Number(b.extendedId))
  }, [searchQuery, pokemonData, activeFilters, favoritePokemons])
}
