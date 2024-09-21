import { useEffect, useState } from 'react'

import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useInfiniteQuery } from '@tanstack/react-query'
import { addFavoritePokemon, fetchFavoritePokemons } from '../firebase/firebaseFunctions'

import palette from '@/constants/palette'
import axios from 'axios'
export interface IMatchedPokemon {
  id: number
  name: string
  typeList: string[]
}

const typesData = require('../data/types.json')
const typesMap = new Map<string, string[]>(
  typesData.map((pokemon: IMatchedPokemon) => [pokemon.name.toUpperCase(), pokemon.typeList])
)

const getTypeColor = (type: string, colorSet: 'background' | 'chip') => {
  const typeColors = colorSet === 'background' ? palette.typeColors : palette.chipColors
  const colorKey = type.toLowerCase() as keyof typeof typeColors
  return typeColors[colorKey] || typeColors.default
}

const transformPokemonData = (pokemon: any): PokemonData => {
  const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
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
    id: pokemon.id,
    name: pokemonName,
    shortenedId: pokemonSimpleId,
    extendedId: pokemonExtendedId,
    url: pokemonUrl,
    chipColors,
    backgroundColors,
    isFavorite: false,
    types,
    species: pokemon.species,
    stats: pokemon.stats
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

// export const usePokemonData = () => {
//   const [favoritePokemons, setFavoritePokemons] = useState<PokemonData[]>([])

//   const query = useInfiniteQuery({
//     queryKey: ['pokemonData'],
//     queryFn: fetchPokemonData,
//     getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextOffset : undefined),
//     initialPageParam: 0
//   })

//   useEffect(() => {
//     fetchFavoritePokemons().then(setFavoritePokemons)
//   }, [])

//   const toggleFavorite = (pokemonToToggle: PokemonData) => {
//     setFavoritePokemons((prevFavorites) => {
//       const isFavorite = prevFavorites.some((fav) => fav.extendedId === pokemonToToggle.extendedId)
//       if (isFavorite) {
//         return prevFavorites.filter((fav) => fav.extendedId !== pokemonToToggle.extendedId)
//       } else {
//         return [...prevFavorites, pokemonToToggle]
//       }
//     })
//   }

//   const pokemonData = query.data?.pages.flatMap((page) => page.data) || []
//   const integratedData = pokemonData.map((pokemon) => ({
//     ...pokemon,
//     isFavorite: favoritePokemons.some((fav) => fav.extendedId === pokemon.extendedId)
//   }))

//   return {
//     isFetching: query.isFetching,
//     isFetched: query.isFetched,
//     error: query.error,
//     data: integratedData.slice(0, 151),
//     fetchNextPage: query.fetchNextPage,
//     hasNextPage: query.hasNextPage,
//     isFetchingNextPage: query.isFetchingNextPage,
//     toggleFavorite // <-- Expose the toggle function
//   }
// }

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

  const toggleFavorite = async (pokemonToToggle: PokemonData) => {
    console.log(pokemonToToggle, 'toggle poke')

    setFavoritePokemons((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.name === pokemonToToggle.name)

      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.name !== pokemonToToggle.name)
      } else {
        addFavoritePokemon(pokemonToToggle).catch((error) => {
          console.error('Failed to add Pokémon to favorites:', error)
        })
        return [...prevFavorites, pokemonToToggle]
      }
    })
  }

  const pokemonData = query.data?.pages.flatMap((page) => page.data) || []
  const integratedData = pokemonData.map((pokemon) => ({
    ...pokemon,
    isFavorite: favoritePokemons.some((fav) => fav.name === pokemon.name)
  }))

  return {
    isFetching: query.isFetching,
    isFetched: query.isFetched,
    error: query.error,
    data: integratedData.slice(0, 151),
    fetchNextPage: query.fetchNextPage,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    toggleFavorite
  }
}
