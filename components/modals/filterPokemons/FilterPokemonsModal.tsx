import { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { PrimaryButton } from '@/components/buttons/PrimaryButton'
import { CustomText } from '@/components/typography/customText'
import palette from '@/constants/palette'
import { pokemonTypes } from '@/constants/pokemons'
import Modal from 'react-native-modal'
import { FilterRow } from './FilterRow'

interface FilterPokemonsModalProps {
  isVisible: boolean
  onClose: () => void
  onApplyFilter: (filters: string[]) => void
}

const chunkArray = (array: { id: string; type: string }[], size: number) => {
  const result: { id: string; type: string }[][] = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export const FilterPokemonsModal = ({ isVisible, onClose, onApplyFilter }: FilterPokemonsModalProps) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const availableFilters = 'Available Filters'
  const resetFilters = 'Reset Filters'

  const numberOfRowItems = 6

  const filterOptions = [...pokemonTypes, { id: 'favorites', type: 'Favorites' }]

  const toggleFilter = (type: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(type) ? prevFilters.filter((filter) => filter !== type) : [...prevFilters, type]
    )
  }

  const handleResetFilters = () => {
    setSelectedFilters([])
  }

  const applyFiltersAndClose = () => {
    onApplyFilter(selectedFilters)
    onClose()
  }

  const onBackdropPress = () => {
    applyFiltersAndClose()
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress} backdropOpacity={0.5}>
      <View style={styles.modalContent}>
        <CustomText weight="semibold" style={styles.text}>
          {availableFilters}
        </CustomText>
        <FlatList
          data={chunkArray(filterOptions, numberOfRowItems)}
          renderItem={({ item }) => (
            <FilterRow data={item} selectedFilters={selectedFilters} toggleFilter={toggleFilter} />
          )}
          keyExtractor={(item) => item?.id}
        />
        <PrimaryButton title={resetFilters} handlePress={handleResetFilters} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 16,
    backgroundColor: palette.colors.white
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  }
})
