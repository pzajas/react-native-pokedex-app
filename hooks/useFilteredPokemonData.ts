import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useMemo } from 'react'

export const useFilteredPokemonData = (searchQuery: string, pokemonData: PokemonData[]) => {
  return useMemo(() => {
    if (!searchQuery) return pokemonData
    return pokemonData.filter((pokemon) => pokemon.name.includes(searchQuery.toLowerCase()))
  }, [searchQuery, pokemonData])
}
