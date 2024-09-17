import { StyleSheet, View } from 'react-native'
import { FilterOption } from './FilterOption'

interface FilterRowProps {
  data: { id: string; type: string }[]
  selectedFilters: string[]
  toggleFilter: (type: string) => void
}

export const FilterRow = ({ data, selectedFilters, toggleFilter }: FilterRowProps) => {
  return (
    <View style={styles.row}>
      {data.map(({ id, type }) => (
        <FilterOption
          key={id}
          type={type}
          selected={selectedFilters.includes(type)}
          onPress={() => toggleFilter(type)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
})
