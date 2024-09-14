import palette from '@/constants/palette'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { capitalize } from 'lodash'
import typesData from '../data/types.json'
export interface PokemonData {
  pokemonName: string
  pokemonNameCapitalized: string
  url: string
  id: number
  pokemonExtendedId: string
  pokemonSimpleId: number
  artworkUrl: string
  pokemonBackgroundColor: string
  pokemonChipColor: string
  types: string[]
  chipColors: string[]
  backgroundColors: string[]
  image: string
  name: string
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
  species: {
    name: string
    url: string
  }
}

const ARTWORK_API_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

const typesMap = new Map<string, string[]>(typesData.map((pokemon) => [pokemon.name.toUpperCase(), pokemon.typeList]))

const getTypeColor = (type: string, colorSet: 'background' | 'chip') => {
  const typeColors = colorSet === 'background' ? palette.typeColors : palette.chipColors

  const colorKey = type.toLowerCase() as keyof typeof typeColors
  return typeColors[colorKey] || typeColors.default
}

const transformPokemonData = (pokemon: PokemonData) => {
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop() as string
  const pokemonSimpleId = Number(pokemonId)
  const pokemonExtendedId = pokemonSimpleId.toString().padStart(3, '0')
  const pokemonName = pokemon.name
  const pokemonNameCapitalized = capitalize(pokemonName)
  const types = typesMap.get(pokemonName.toUpperCase()) || []

  const chipColors: string[] = []
  const backgroundColors: string[] = []

  types.forEach((type) => {
    chipColors.push(getTypeColor(type, 'chip'))
    backgroundColors.push(getTypeColor(type, 'background'))
  })

  const artworkUrl = `${ARTWORK_API_URL}/${pokemonSimpleId}.png`

  return {
    pokemonName,
    pokemonNameCapitalized,
    pokemonSimpleId,
    pokemonExtendedId,
    url: pokemon.url,
    types,
    chipColors,
    backgroundColors,
    artworkUrl
  }
}

const fetchPokemonData = async ({
  pageParam = 0
}: {
  pageParam?: number
}): Promise<{ data: PokemonData[]; nextOffset: number | undefined; hasMore: boolean }> => {
  const limit = 25
  const offset = pageParam * limit

  const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
    params: {
      limit,
      offset
    }
  })

  const dataWithIds = response.data.results.map(transformPokemonData)

  return {
    data: dataWithIds,
    nextOffset: response.data.next ? pageParam + 1 : undefined,
    hasMore: !!response.data.next
  }
}

export const usePokemonData = () => {
  const query = useInfiniteQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemonData,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextOffset : undefined),
    initialPageParam: 0
  })

  return {
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    error: query.error,
    data: query.data,
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage
  }
}
