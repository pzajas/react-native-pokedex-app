import { Pressable, StyleSheet } from 'react-native'
import { CustomText } from '../../typography/customText'

interface FilterOptionProps {
  type: string
  selected: boolean
  onPress: () => void
}

export const FilterOption = ({ type, selected, onPress }: FilterOptionProps) => {
  return (
    <Pressable style={[styles.filterOption, selected ? styles.selectedOption : null]} onPress={onPress}>
      <CustomText style={styles.text}>{type}</CustomText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  filterOption: {
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    margin: 4,
    padding: 10,
    width: '30%'
  },
  selectedOption: {
    backgroundColor: '#e0e0e0',
    borderColor: '#000'
  },
  text: {
    fontSize: 12
  }
})
