import { PokemonDetails, StatsAccumulator } from '@/typescript/types/pokemonTypes'
import axios from 'axios'
import constants from '../../constants/constants'
import { queryClient } from '../tanstack/queryClient'

const POKE_API_URL = constants.api.POKE_API_URL

export const fetchPokemonData = async () => {
  try {
    const pokemonListResponse = await axios.get(POKE_API_URL, {
      params: {
        offset: 0,
        limit: 75
      }
    })

    const pokemonList = pokemonListResponse.data.results

    const detailedPokemons = await Promise.all(
      pokemonList.map(async (pokemon: { url: string }) => {
        const detailsResponse = await axios.get<PokemonDetails>(pokemon.url)
        const details = detailsResponse.data

        return {
          id: details.id,
          name: details.name,
          types: details.types.map((type) => type.type.name),
          image: details.sprites.front_default,
          stats: details.stats.reduce<StatsAccumulator>((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat
            return acc
          }, {})
        }
      })
    )

    queryClient.setQueryData(['pokemonData'], detailedPokemons)

    return detailedPokemons
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
    throw error
  }
}
