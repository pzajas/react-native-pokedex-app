import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

// Updated PokemonData interface with stats, moves, and forms
interface PokemonData {
  weight: number
  height: number
  abilities: Array<{ ability: { name: string } }>
  stats: Array<{ base_stat: number; stat: { name: string } }>
  moves: Array<{ move: { name: string } }>
  forms: Array<{ name: string }>
}

// Updated PokemonSpeciesData interface
interface PokemonSpeciesData {
  flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>
  genera: Array<{ genus: string; language: { name: string } }>
  gender_rate: number
  evolution_chain: {
    url: string
  }
}

// EvolutionChain interface
interface EvolutionChainData {
  id: number
  baby_trigger_item: any
  chain: {
    species: {
      name: string
      url: string
    }
    evolves_to: Array<{
      species: {
        name: string
        url: string
      }
      evolves_to: Array<any>
    }>
  }
}

// Function to fetch basic Pokemon data
const fetchPokemonByName = async (name: string): Promise<PokemonData> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return response.data
}

// Function to fetch Pokemon species data
const fetchPokemonSpeciesByName = async (name: string): Promise<PokemonSpeciesData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Pokemon species data:', error)
    throw error
  }
}

// Function to fetch evolution chain data
const fetchEvolutionChainByUrl = async (url: string): Promise<EvolutionChainData> => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching evolution chain data:', error)
    throw error
  }
}

// Custom hook to manage Pokemon, species, and evolution data
export const usePokemonData = (name: string) => {
  const pokemonQuery = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name),
    enabled: !!name,
    onError: (error) => {
      console.error('Error fetching Pokemon data:', error)
    }
  })

  const speciesQuery = useQuery({
    queryKey: ['pokemonSpecies', name],
    queryFn: () => fetchPokemonSpeciesByName(name),
    enabled: !!name,
    onError: (error) => {
      console.error('Error fetching Pokemon species data:', error)
    }
  })

  const evolutionChainQuery = useQuery({
    queryKey: ['evolutionChain', name],
    queryFn: async () => {
      const speciesData = await speciesQuery.refetch()
      const evolutionChainUrl = speciesData.data?.evolution_chain.url
      if (evolutionChainUrl) {
        return fetchEvolutionChainByUrl(evolutionChainUrl)
      }
      return null
    },
    enabled: !!name && speciesQuery.isSuccess,
    onError: (error) => {
      console.error('Error fetching evolution chain data:', error)
    }
  })

  // Utility function to sanitize text
  const sanitizeText = (text: string) => {
    return text.replace(/♀/g, '') // Removes any special characters like ♀
  }

  // Fetches the first English flavor text entry
  const getEnglishEntry = (entries: Array<{ flavor_text: string; language: { name: string } }>) => {
    const englishEntry = entries.find((entry) => entry.language.name === 'en')
    if (englishEntry) {
      return sanitizeText(englishEntry.flavor_text) // Sanitize the text
    }
    return ''
  }

  // Processes Pokemon data if available
  const pokemonData = pokemonQuery.data
    ? {
        weight: pokemonQuery.data.weight,
        height: pokemonQuery.data.height,
        abilities: pokemonQuery.data.abilities?.map((a) => a.ability.name) || [],
        stats:
          pokemonQuery.data.stats?.map((s) => ({
            name: s.stat.name,
            value: s.base_stat
          })) || [],
        moves: pokemonQuery.data.moves?.map((m) => m.move.name) || [],
        forms: pokemonQuery.data.forms?.map((f) => f.name) || []
      }
    : null

  // Processes species data if available
  const speciesData = speciesQuery.data
    ? {
        description: getEnglishEntry(speciesQuery.data.flavor_text_entries), // Get English description
        genera: speciesQuery.data.genera?.filter((g) => g.language.name === 'en').map((g) => g.genus) || [],
        genderRate: speciesQuery.data.gender_rate
      }
    : null

  // Process evolution chain data
  const evolutionChainData = evolutionChainQuery.data
    ? {
        chain: evolutionChainQuery.data.chain
      }
    : null

  // Return final structured data, loading, and error state
  return {
    pokemon: pokemonData,
    species: speciesData,
    evolutions: evolutionChainData,
    isLoading: pokemonQuery.isLoading || speciesQuery.isLoading || evolutionChainQuery.isLoading,
    isError: pokemonQuery.isError || speciesQuery.isError || evolutionChainQuery.isError
  }
}
