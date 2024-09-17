import { useInfiniteQuery } from '@tanstack/react-query'

import palette from '@/constants/palette'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import axios from 'axios'
import typesData from '../data/types.json'

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
  const pokemonUrl = pokemon.url
  const types = typesMap.get(pokemonName.toUpperCase()) || []

  const chipColors: string[] = []
  const backgroundColors: string[] = []

  types.forEach((type) => {
    chipColors.push(getTypeColor(type, 'chip'))
    backgroundColors.push(getTypeColor(type, 'background'))
  })

  return {
    name: pokemonName,
    shortenedId: pokemonSimpleId,
    extendedId: pokemonExtendedId,
    url: pokemonUrl,
    types,
    chipColors,
    backgroundColors
  }
}

const fetchPokemonData = async ({
  pageParam = 0
}: {
  pageParam?: number
}): Promise<{ data: PokemonData[]; nextOffset: number | undefined; hasMore: boolean }> => {
  const limit = 10
  const offset = pageParam * limit
  const maxLength = 151

  const response = await axios.get('https://pokeapi.co/api/v2/pokemon', {
    params: {
      limit,
      offset
    }
  })

  const dataWithIds = response.data.results.map(transformPokemonData)

  const hasMore = dataWithIds.length === limit && offset + limit < maxLength

  return {
    data: dataWithIds,
    nextOffset: hasMore ? pageParam + 1 : undefined,
    hasMore
  }
}

export const usePokemonData = () => {
  const query = useInfiniteQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemonData,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextOffset : undefined),
    initialPageParam: 0
  })

  const pokemonData = query.data?.pages.flatMap((page) => page.data) || []

  return {
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    error: query.error,
    data: pokemonData.slice(0, 151),
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage
  }
}
