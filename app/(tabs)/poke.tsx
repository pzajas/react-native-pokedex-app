import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { FilterPokemonsModal } from '@/components/modals/filterPokemons/FilterPokemonsModal'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { useFilterHandler } from '@/hooks/useFilterHandler'
import { useScrollToTopButton } from '@/hooks/useScrollToTop'
import { PokemonCard } from '@/screens/pokemons/components/card/pokemonCard'
import { PokemonsHeader } from '@/screens/pokemons/components/header/PokemonsHeader'
import { SearchInput } from '@/screens/pokemons/components/search/SearchInput'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useNavigatePokemon } from '@/utils/navigation/useNavigatePokemon'
import { useCallback, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import palette from '@/constants/palette'

export default function PokeScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const flatListRef = useRef<FlatList<PokemonData>>(null)

  const { data: pokemonData, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()
  const { showScrollToTop, handleScroll, scrollToTop } = useScrollToTopButton(flatListRef)
  const navigatePokemon = useNavigatePokemon()

  const { isModalVisible, handleFilterPress, handleApplyFilters, setIsModalVisible } = useFilterHandler(
    [],
    (filters) => {
      setActiveFilters(filters)
    }
  )

  const filteredData = useFilteredPokemonData(searchQuery, pokemonData, activeFilters)

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
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        ref={flatListRef}
        data={filteredData?.sort((a, b) => a.extendedId - b.extendedId)}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        ListFooterComponent={isFetchingNextPage ? <LoadingIndicator /> : null}
        ListHeaderComponent={
          <View style={{ backgroundColor: 'white' }}>
            <PokemonsHeader />
            <SearchInput
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterPress={handleFilterPress}
            />
          </View>
        }
      />
      {showScrollToTop && <SmallRoundButton onPress={scrollToTop} iconName="arrow-upward" />}
      <FilterPokemonsModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onApplyFilter={handleApplyFilters}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.colors.white
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80
  },
  itemContainer: {
    marginBottom: 16
  }
})
