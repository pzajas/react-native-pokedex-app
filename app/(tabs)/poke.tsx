import { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { SmallRoundButton } from '@/components/buttons/SmallRoundButton'
import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { FilterPokemonsModal } from '@/components/modals/filterPokemons/FilterPokemonsModal'
import palette from '@/constants/palette'
import { useFilteredPokemonData } from '@/hooks/useFilteredPokemonData'
import { useScrollToTopButton } from '@/hooks/useScrollToTop'
import { PokemonCard } from '@/screens/pokemons/components/card/pokemonCard'
import { PokemonsHeader } from '@/screens/pokemons/components/header/PokemonsHeader'
import { SearchInput } from '@/screens/pokemons/components/search/SearchInput'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { fetchFavoritePokemons } from '@/services/firebase/firebaseFunctions'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useNavigatePokemon } from '@/utils/navigation/useNavigatePokemon'

export default function PokeScreen() {
  const flatListRef = useRef<FlatList<PokemonData>>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [favoritePokemons, setFavoritePokemons] = useState<PokemonData[]>([])
  const [showFavorites, setShowFavorites] = useState(false) // Toggle for showing favorites

  const { data: pokemonData, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonData()
  const { showScrollToTop, handleScroll, scrollToTop } = useScrollToTopButton(flatListRef)

  const navigatePokemon = useNavigatePokemon()

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await fetchFavoritePokemons()
      setFavoritePokemons(favorites)
    }
    fetchFavorites()
  }, [])

  // Check if 'Favorites' is in the filters
  const hasFavoritesFilter = activeFilters.includes('Favorites')

  // Determine the data to display
  const filteredData = useFilteredPokemonData(searchQuery, pokemonData, activeFilters)
  const displayData = hasFavoritesFilter ? favoritePokemons : showFavorites ? favoritePokemons : filteredData

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
    setShowFavorites(false) // Reset to show all pokemons when filters are applied
  }

  const toggleFavoriteView = () => {
    setShowFavorites(!showFavorites)
  }

  const renderItem = ({ item }: { item: PokemonData }) => (
    <View style={styles.itemContainer}>
      <PokemonCard pokemon={item} handleNavigatePokemon={navigatePokemon} />
    </View>
  )

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <FlatList
        ref={flatListRef}
        data={displayData}
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
