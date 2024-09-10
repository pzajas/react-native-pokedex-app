import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { PokemoneCard } from '@/components/cards/pokemonCard'
import palette from '@/constants/palette'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { PokemonsHeader } from '@/screens/pokemons/PokemonsHeader'
import { PokemonsNoResults } from '@/screens/pokemons/PokemonsNoResults'
import { SearchInput } from '@/screens/pokemons/SearchInput'
import { queryClient } from '@/services/tanstack/queryClient'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useScrollToTop } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'

export default function PokeScreen() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const flatListRef = useRef<FlatList<PokemonData>>(null)

  const { data: pokemonData = [], isFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData[]>(['pokemonData']),
    staleTime: Infinity
  })

  const filteredData = useFilteredPokemonData(searchQuery, pokemonData)

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: `/(pages)/pokemon/[id]`,
      params: { id: item.name }
    })
  }

  const [showScrollToTop, setShowScrollToTop] = useState(false)
  useScrollToTop(flatListRef)

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y
    setShowScrollToTop(offsetY > 100)
  }, [])

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
  }

  if (!isFetched) {
    return <ActivityIndicator style={styles.loader} />
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <PokemoneCard item={item} handleNavigatePokemon={handleNavigatePokemon} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <PokemonsHeader />
            <SearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </View>
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.noResults}>
            <PokemonsNoResults />
          </View>
        }
        onScroll={handleScroll}
      />
      {showScrollToTop && <SmallRoundButton onPress={scrollToTop} iconName="arrow-upward" />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.light.background
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10
  },
  itemContainer: {
    paddingVertical: 6
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
