import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useMemo } from 'react'

export const useFilteredPokemonData = (searchQuery: string, pokemonData: PokemonData[], activeFilters: string[]) => {
  return useMemo(() => {
    let filteredData = pokemonData

    if (searchQuery) {
      console.log('Applying search query:', searchQuery)
      filteredData = filteredData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
      console.log('Data after search filter:', filteredData)
    }

    if (activeFilters.length > 0) {
      console.log('Applying filters:', activeFilters)
      filteredData = filteredData.filter((pokemon) => {
        const hasType = pokemon.types.some((type) => activeFilters.includes(type))
        console.log(`Pokemon ${pokemon.name} has matching types:`, hasType)
        return hasType
      })
      console.log('Data after filters:', filteredData)
    }

    return filteredData
  }, [searchQuery, pokemonData, activeFilters])
}
