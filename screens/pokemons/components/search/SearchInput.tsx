import { useForm } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

import { IconButton } from './SearchBarButton'
import { SearchTextInput } from './SearchTextInput'

import palette from '@/constants/palette'
interface SearchInputProps {
  searchQuery: string
  isFocused: boolean
  onSearchChange: (query: string) => void
  setIsFocused: (focused: boolean) => void
  onFilterPress?: () => void
}

export const SearchInput = ({
  isFocused,
  setIsFocused,
  searchQuery,
  onSearchChange,
  onFilterPress
}: SearchInputProps) => {
  const { control, reset } = useForm<{ search: string }>({
    defaultValues: { search: searchQuery }
  })

  const handleResetSearchQuery = () => {
    onSearchChange('')
    reset({ search: '' })
  }

  return (
    <View style={styles.container}>
      <IconButton name="search" size={20} />
      <SearchTextInput
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        control={control}
      />
      <IconButton name="x" onPress={handleResetSearchQuery} />
      <IconButton name="filter" onPress={onFilterPress} size={18} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: palette.colors.black
  }
})
