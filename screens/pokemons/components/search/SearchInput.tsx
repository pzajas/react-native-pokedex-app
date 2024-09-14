import { StyleSheet, View } from 'react-native'

import { IconButton } from './SearchBarButton'
import { SearchTextInput } from './SearchTextInput'

import palette from '@/constants/palette'
import { useForm } from 'react-hook-form'

interface SearchInputProps {
  searchQuery: string
  isFocused: boolean
  onSearchChange: (query: string) => void
  setIsFocused: (focused: boolean) => void
}

export const SearchInput = ({ isFocused, setIsFocused, searchQuery, onSearchChange }: SearchInputProps) => {
  const { control, reset } = useForm<{ search: string }>({
    defaultValues: { search: searchQuery }
  })

  const handleResetSearchQuery = () => {
    onSearchChange('')
    reset({ search: '' })
  }

  return (
    <View style={styles.container}>
      <IconButton name="search" />
      <SearchTextInput
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
        control={control}
      />
      <IconButton name="close" onPress={handleResetSearchQuery} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: palette.colors.black
  }
})
