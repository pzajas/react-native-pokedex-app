import constants from '@/constants/constants'
import { formatPokemonId } from '@/utils/formatters/formatPokemonId'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

interface PokemonData {
  weight: number
  height: number
  abilities: Array<{ ability: { name: string } }>
  stats: Array<{ base_stat: number; stat: { name: string } }>
  moves: Array<{ move: { name: string } }>
  forms: Array<{ name: string }>
  types: Array<{ type: { name: string } }>
  cries: CryData
}

interface PokemonSpeciesData {
  id: string
  flavor_text_entries: Array<{ flavor_text: string; language: { name: string } }>
  genera: Array<{ genus: string; language: { name: string } }>
  gender_rate: number
  evolution_chain: {
    url: string
  }
  habitat: { url: string }
  shape: { url: string }
}

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

interface PokemonHabitatData {
  name: string
  url: string
}

interface PokemonShapeData {
  name: string
  url: string
}
interface CryData {
  latest: string
  legacy: string
}

const fetchPokemonByName = async (name: string): Promise<PokemonData> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return response.data
}

const fetchPokemonSpeciesByName = async (name: string): Promise<PokemonSpeciesData> => {
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
  return response.data
}

const fetchEvolutionChainByUrl = async (url: string): Promise<EvolutionChainData> => {
  const response = await axios.get(url)
  return response.data
}

const fetchPokemonHabitatByUrl = async (url: string): Promise<PokemonHabitatData> => {
  const response = await axios.get(url)
  return response.data
}

const fetchPokemonShapeByUrl = async (url: string): Promise<PokemonShapeData> => {
  const response = await axios.get(url)
  return response.data
}

export const usePokemonData = (name: string) => {
  const pokemonQuery = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => fetchPokemonByName(name),
    enabled: !!name
  })

  const speciesQuery = useQuery({
    queryKey: ['pokemonSpecies', name],
    queryFn: () => fetchPokemonSpeciesByName(name),
    enabled: !!name
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
    enabled: !!name && speciesQuery.isSuccess
  })

  const habitatQuery = useQuery({
    queryKey: ['pokemonHabitat', name],
    queryFn: async () => {
      const speciesData = await speciesQuery.refetch()
      const habitatUrl = speciesData.data?.habitat?.url
      if (habitatUrl) {
        return fetchPokemonHabitatByUrl(habitatUrl)
      }
      return null
    },
    enabled: !!name && speciesQuery.isSuccess
  })

  const shapeQuery = useQuery({
    queryKey: ['pokemonShape', name],
    queryFn: async () => {
      const speciesData = await speciesQuery.refetch()
      const shapeUrl = speciesData.data?.shape?.url
      if (shapeUrl) {
        return fetchPokemonShapeByUrl(shapeUrl)
      }
      return null
    },
    enabled: !!name && speciesQuery.isSuccess
  })

  const sanitizeText = (text: string) => {
    return text.replace(/♀/g, '')
  }

  const getEnglishEntry = (entries: Array<{ flavor_text: string; language: { name: string } }>) => {
    const englishEntry = entries.find((entry) => entry.language.name === 'en')
    if (englishEntry) {
      return sanitizeText(englishEntry.flavor_text)
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
        forms: pokemonQuery.data.forms?.map((f) => f.name) || [],
        types: pokemonQuery.data.types?.map((type) => type.type.name) || [],
        cries: {
          latest: pokemonQuery.data.cries?.latest || '',
          legacy: pokemonQuery.data.cries?.legacy || ''
        }
      }
    : null

  const speciesData = speciesQuery.data
    ? {
        description: getEnglishEntry(speciesQuery.data.flavor_text_entries),
        genera: speciesQuery.data.genera?.filter((g) => g.language.name === 'en').map((g) => g.genus) || [],
        genderRate: speciesQuery.data.gender_rate,
        id: speciesQuery.data.id
      }
    : null

  const evolutionChainData = evolutionChainQuery.data
    ? {
        chain: evolutionChainQuery.data.chain
      }
    : null

  const habitatData = habitatQuery.data
    ? {
        habitatName: habitatQuery.data.name
      }
    : null

  const shapeData = shapeQuery.data
    ? {
        shapeName: shapeQuery.data.name
      }
    : null

  const shortenedId = speciesData?.id

  return {
    shortenedId,
    extendedId: formatPokemonId(shortenedId),
    weight: pokemonData?.weight,
    height: pokemonData?.height,
    abilities: pokemonData?.abilities,
    moves: pokemonData?.moves,
    stats: pokemonData?.stats || [],
    types: pokemonData?.types || [],
    cries: pokemonData?.cries || { latest: '', legacy: '' },
    genera: speciesData?.genera || [],
    description: speciesData?.description || '',
    genderRate: speciesData?.genderRate || 0,
    evolutions: evolutionChainData,
    habitat: habitatData?.habitatName || '',
    shape: shapeData?.shapeName || '',
    url: `${constants.api.ARTWORK_API_URL}/${shortenedId}.png` || '',
    isLoading:
      pokemonQuery.isLoading ||
      speciesQuery.isLoading ||
      evolutionChainQuery.isLoading ||
      habitatQuery.isLoading ||
      shapeQuery.isLoading,
    isError:
      pokemonQuery.isError ||
      speciesQuery.isError ||
      evolutionChainQuery.isError ||
      habitatQuery.isError ||
      shapeQuery.isError
  }
}
