import palette from '@/constants/palette'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { fetchFavoritePokemons } from '../firebase/firebaseFunctions'

const typesData = require('../data/types.json') // Adjust path if necessary
const typesMap = new Map<string, string[]>(typesData.map((pokemon) => [pokemon.name.toUpperCase(), pokemon.typeList]))

const getTypeColor = (type: string, colorSet: 'background' | 'chip') => {
  // Assuming palette is imported or defined elsewhere
  const typeColors = colorSet === 'background' ? palette.typeColors : palette.chipColors
  const colorKey = type.toLowerCase() as keyof typeof typeColors
  return typeColors[colorKey] || typeColors.default
}

const transformPokemonData = (pokemon: any): PokemonData => {
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
    backgroundColors,
    isFavorite: false // Default value
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
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonData[]>([])

  const query = useInfiniteQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemonData,
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextOffset : undefined),
    initialPageParam: 0
  })

  useEffect(() => {
    fetchFavoritePokemons().then(setFavoritePokemons)
  }, [])

  const pokemonData = query.data?.pages.flatMap((page) => page.data) || []

  // Integrate favorite data with API data
  const integratedData = pokemonData.map((pokemon) => ({
    ...pokemon,
    isFavorite: favoritePokemons.some((fav) => fav.extendedId === pokemon.extendedId)
  }))

  return {
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    error: query.error,
    data: integratedData.slice(0, 151),
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage
  }
}
