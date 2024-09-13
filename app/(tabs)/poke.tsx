import { useRouter } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { PokemonCard } from '@/components/cards/PokemonCard'
import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { useScrollToTopButton } from '@/hooks/useScrollToTop'
import { PokemonData, usePokemonData } from '@/services/api/fetchPokemonData'

import palette from '@/constants/palette'
import { SearchInput } from '@/screens/pokemons/components/search/SearchInput'
import { PokemonsHeader } from '@/screens/pokemons/components/search/header/PokemonsHeader'

export default function PokeScreen() {
  const router = useRouter()
  const flatListRef = useRef<FlatList<PokemonData>>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()
  const { showScrollToTop, handleScroll, scrollToTop } = useScrollToTopButton(flatListRef)

  const pokemonData = data?.pages.flatMap((page) => page.data) || []
  const filteredData = useFilteredPokemonData(searchQuery, pokemonData)

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: '/pokemon/[name]',
      params: {
        name: item.pokemonName,
        artwork: item.artworkUrl,
        backgroundColor: item.backgroundColors[0] || 'defaultBackgroundColor',
        chip: item.chipColors[0] || 'defaultChipColor'
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
        ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        ListHeaderComponent={
          <>
            <PokemonsHeader />
            <SearchInput
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </>
        }
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
  }
})
