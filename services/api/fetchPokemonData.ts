import { PokemonDetails, StatsAccumulator } from '@/typescript/types/pokemonTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import constants from '../../constants/constants'
import moveDataJson from '../data/moves.json'

const POKE_API_URL = constants.api.POKE_API_URL

const padNumber = (num: number, length: number) => num.toString().padStart(length, '0')

const calculateGenderPercentage = (genderRate: number) => {
  if (genderRate === -1) {
    return { male: 0, female: 0, genderless: true }
  }

  const malePercentage = ((8 - genderRate) / 8) * 100
  const femalePercentage = (genderRate / 8) * 100

  return { male: malePercentage, female: femalePercentage, genderless: false }
}

const fetchPokemonList = async (offset: number) => {
  const response = await axios.get(POKE_API_URL, {
    params: {
      offset,
      limit: 10
    }
  })
  return response.data
}

const fetchPokemonDetails = async (url: string) => {
  const response = await axios.get<PokemonDetails>(url)
  const details = response.data
  const urlSegments = url.split('/')
  const id = padNumber(Number(urlSegments[urlSegments.length - 2]), 3)

  const speciesUrl = details.species.url
  const speciesResponse = await axios.get(speciesUrl)
  const speciesData = speciesResponse.data

  const category = speciesData.genera.find(
    (genus: { language: { name: string }; genus: string }) => genus.language.name === 'en'
  )

  const descriptions = speciesData.flavor_text_entries
    .filter((entry: { language: { name: string } }) => entry.language.name === 'en')
    .map((entry: { flavor_text: string }) => entry.flavor_text.replace(/\s+/g, ' ').trim())

  const genderRate = speciesData.gender_rate
  const gender = calculateGenderPercentage(genderRate)

  const moveTypeMap = moveDataJson.reduce((acc: { [key: number]: string }, move: { id: number; type: string }) => {
    acc[move.id] = move.type
    return acc
  }, {})

  const movesWithTypes = details.moves.map((move) => {
    const moveId = Number(move.move.url.split('/').slice(-2, -1))
    return {
      name: move.move.name,
      type: moveTypeMap[moveId] || 'Unknown'
    }
  })

  return {
    id,
    name: details.name,
    types: details.types.map((type) => type.type.name),
    image: details.sprites.front_default,
    stats: details.stats.reduce<StatsAccumulator>((acc, stat) => {
      acc[stat.stat.name] = stat.base_stat
      return acc
    }, {}),
    weight: details.weight,
    height: details.height,
    abilities: details.abilities.map((ability) => ability.ability.name),
    color: speciesData.color.name,
    category: category ? category.genus : 'Unknown',
    descriptions: descriptions.length > 0 ? descriptions : ['No description available'],
    gender: gender,
    moves: movesWithTypes
  }
}

const fetchPokemonData = async ({ pageParam = 0 }: { pageParam?: number }) => {
  const pokemonList = await fetchPokemonList(pageParam)
  const pokemonDetails = await Promise.all(
    pokemonList.results.map((pokemon: { url: string }) => fetchPokemonDetails(pokemon.url))
  )
  return {
    pokemonDetails,
    nextOffset: pageParam + 10,
    hasMore: pokemonList.results.length > 0
  }
}

export const usePokemonData = () => {
  return useInfiniteQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemonData,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextOffset : undefined),
    initialPageParam: 0
  })
}
