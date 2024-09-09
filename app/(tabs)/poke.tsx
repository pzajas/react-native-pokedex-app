import { PokemoneCard } from '@/components/cards/pokemonCard'
import { PokemonsHeader } from '@/components/screens/pokemons/PokemonsHeader'
import { PokemonsNoResults } from '@/components/screens/pokemons/PokemonsNoResults'
import { SearchInput } from '@/components/screens/pokemons/SearchInput'
import { View } from '@/components/Themed'
import palette from '@/constants/palette'
import { queryClient } from '@/services/tanstack/queryClient'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'

type PokemonRouteParams = {
  id: string
}

export default function PokeScreen() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const { data: pokemonData = [], isFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData[]>(['pokemonData']),
    staleTime: Infinity
  })

  const filteredData = useMemo(() => {
    if (!searchQuery) return pokemonData
    return pokemonData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, pokemonData])

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: `/(pages)/pokemon/${item.name}` as `/(pages)/pokemon/[id]`,
      params: { id: item.name } as PokemonRouteParams
    })
  }

  const renderItem = ({ item }: { item: PokemonData }) => (
    <View style={styles.itemContainer}>
      <PokemoneCard item={item} handleNavigatePokemon={handleNavigatePokemon} />
    </View>
  )

  if (!isFetched) {
    return <ActivityIndicator style={styles.loader} />
  }

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <PokemonsHeader />
          <SearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </View>
      }
      contentContainerStyle={styles.container}
      ListEmptyComponent={
        <View style={styles.noResults}>
          <PokemonsNoResults />
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: palette.light.background,
    gap: 10
  },
  itemContainer: {
    paddingVertical: 10
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50
  },
  listHeader: {
    gap: 10
  }
})
