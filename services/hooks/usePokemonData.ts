import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface PokemonData {
  weight: number
  height: number
  abilities: Array<{ ability: { name: string } }>
}

interface PokemonSpeciesData {
  flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>
  genera: Array<{ genus: string; language: { name: string } }>
  stats: Array<{ base_stat: number; stat: { name: string } }>
  moves: Array<{ move: { name: string } }>
  forms: Array<{ name: string }>
  gender_rate: number
}

const fetchPokemonByName = async (name: string): Promise<PokemonData> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return response.data
}

const fetchPokemonSpeciesByName = async (name: string): Promise<PokemonSpeciesData> => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
    return response.data
  } catch (error) {
    console.error('Error fetching Pokemon species data:', error)
    throw error
  }
}

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

  const sanitizeText = (text: string) => {
    return text.replace(/♀/g, '') // Remove special characters
  }

  const getEnglishEntry = (entries: Array<{ flavor_text: string; language: { name: string } }>) => {
    const englishEntry = entries.find((entry) => entry.language.name === 'en')
    if (englishEntry) {
      return sanitizeText(englishEntry.flavor_text) // Sanitize the text
    }
    return ''
  }

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

  const speciesData = speciesQuery.data
    ? {
        description: speciesQuery.data.flavor_text_entries,
        genera: speciesQuery.data.genera.filter((g) => g.language.name === 'en').map((g) => g.genus) || [],
        genderRate: speciesQuery.data.gender_rate
      }
    : null

  return {
    pokemon: pokemonData,
    species: speciesData,
    isLoading: pokemonQuery.isLoading || speciesQuery.isLoading,
    isError: pokemonQuery.isError || speciesQuery.isError
  }
}
