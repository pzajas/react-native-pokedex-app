import { Controller } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'

import palette from '@/constants/palette'

interface SearchTextInputProps {
  searchQuery: string
  isFocused: boolean
  control: any
  onSearchChange: (query: string) => void
  setIsFocused: (focused: boolean) => void
}

export const SearchTextInput = ({
  searchQuery,
  onSearchChange,
  isFocused,
  setIsFocused,
  control
}: SearchTextInputProps) => {
  return (
    <View style={styles.inputContainer}>
      {!isFocused && !searchQuery && <CustomText style={styles.placeholder}>{typography.typePokemonName}</CustomText>}
      <Controller
        control={control}
        name="search"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholderTextColor={palette.colors.transparent}
            onChangeText={(text) => {
              onChange(text)
              onSearchChange(text)
            }}
            value={value}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    color: palette.colors.black,
    fontFamily: typography.poppinsMedium
  },
  placeholder: {
    position: 'absolute',
    left: 8,
    fontSize: 16,
    color: palette.colors.black,
    fontFamily: typography.poppinsMedium
  }
})
