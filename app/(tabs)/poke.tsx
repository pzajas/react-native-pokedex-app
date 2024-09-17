import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { FilterPokemonsModal } from '@/components/modals/filterPokemons/FilterPokemonsModal'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { useScrollToTopButton } from '@/hooks/useScrollToTop'
import { PokemonCard } from '@/screens/pokemons/components/card/pokemonCard'
import { PokemonsHeader } from '@/screens/pokemons/components/header/PokemonsHeader'
import { SearchInput } from '@/screens/pokemons/components/search/SearchInput'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { fetchFavoritePokemons } from '@/services/firebase/firebaseFunctions'
import { useNavigatePokemon } from '@/utils/navigation/useNavigatePokemon'

import palette from '@/constants/palette'
import { PokemonData } from '@/typescript/types/pokemonTypes'

export default function PokeScreen() {
  const flatListRef = useRef<FlatList<PokemonData>>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonData[]>([])

  const { data: pokemonData, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()
  const { showScrollToTop, handleScroll, scrollToTop } = useScrollToTopButton(flatListRef)

  const navigatePokemon = useNavigatePokemon()
  const filteredData = useFilteredPokemonData(searchQuery, pokemonData, activeFilters)

  const handleLoadMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage])

  const handleFilterPress = () => {
    setIsModalVisible(true)
  }

  const handleApplyFilters = (filters: string[]) => {
    setActiveFilters(filters)
  }

  const fetchFavorites = async () => {
    const favorites = await fetchFavoritePokemons()
    setFavoritePokemons(favorites)
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  const renderItem = ({ item }: { item: PokemonData }) => (
    <View style={styles.itemContainer}>
      <PokemonCard pokemon={item} handleNavigatePokemon={navigatePokemon} />
    </View>
  )

  console.log(favoritePokemons)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        ref={flatListRef}
        data={filteredData.length > 0 ? filteredData : favoritePokemons}
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
    gap: 10
  },
  itemContainer: {
    paddingVertical: 6
  }
})
