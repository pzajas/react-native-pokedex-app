import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { PokemonCard } from '@/components/cards/PokemonCard'
import palette from '@/constants/palette'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { SearchInput } from '@/screens/pokemons/SearchInput'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native'
interface PokemonData {
  pokemonName: string
  pokemonNameCapitalized: string
  url: string
  id: number
  pokemonExtendedId: string
  pokemonSimpleId: number
  artworkUrl: string
  pokemonBackgroundColor: string
  pokemonChipColor: string
  types: {
    type: string
    chipColor: string
    backgroundColor: string
  }[]
}

export default function PokeScreen() {
  const router = useRouter()

  const flatListRef = useRef<FlatList<PokemonData>>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()

  const pokemonData = data?.pages.flatMap((page) => page.data) || []
  const filteredData = useFilteredPokemonData(searchQuery, pokemonData)

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

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: '/pokemon/[name]',
      params: {
        name: item.pokemonName,
        artwork: item.artworkUrl,
        backgroundColor: item.backgroundColors[0] || 'defaultBackgroundColor', // Provide a default value
        chip: item.chipColors[0] || 'defaultChipColor' // Provide a default value
      }
    })
  }
  const renderItem = ({ item }: { item: PokemonData }) => (
    <View style={styles.itemContainer}>
      <PokemonCard pokemon={item} handleNavigatePokemon={handleNavigatePokemon} />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredData}
        renderItem={renderItem}
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
