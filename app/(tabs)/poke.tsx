import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { PokemoneCard } from '@/components/cards/pokemonCard'
import palette from '@/constants/palette'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { SearchInput } from '@/screens/pokemons/SearchInput'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'

export default function PokeScreen() {
  const router = useRouter()
  const flatListRef = useRef<FlatList<PokemonData>>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()

  const pokemonData = data?.pages.flatMap((page) => page.pokemonDetails) || []
  const filteredData = useFilteredPokemonData(searchQuery, pokemonData)

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: `/(pages)/pokemon/[id]`,
      params: { id: item.name }
    })
  }

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y
    setShowScrollToTop(offsetY > 100)
  }, [])

  const scrollToTop = () => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
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
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator size="large" /> : null}
        ListHeaderComponent={<SearchInput searchQuery={searchQuery} onSearchChange={setSearchQuery} />}
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
  }
})
