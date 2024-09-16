import { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { PokemonCard } from '@/components/cards/pokemonCard'
import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { useScrollToTopButton } from '@/hooks/useScrollToTop'
import { PokemonsHeader } from '@/screens/pokemons/components/header/PokemonsHeader'
import { SearchInput } from '@/screens/pokemons/components/search/SearchInput'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { useNavigatePokemon } from '@/utils/navigation/useNavigatePokemon'

import palette from '@/constants/palette'
import { PokemonData } from '@/typescript/types/pokemonTypes'

export default function PokeScreen() {
  const flatListRef = useRef<FlatList<PokemonData>>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { data: pokemonData, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()
  const { showScrollToTop, handleScroll, scrollToTop } = useScrollToTopButton(flatListRef)

  const navigatePokemon = useNavigatePokemon()
  const filteredData = useFilteredPokemonData(searchQuery, pokemonData)

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const renderItem = ({ item }: { item: PokemonData }) => (
    <View style={styles.itemContainer}>
      <PokemonCard pokemon={item} handleNavigatePokemon={navigatePokemon} />
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
