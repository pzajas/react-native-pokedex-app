import { CustomText } from '@/components/typography/customText'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, TextInput, View } from 'react-native'

type FormValues = {
  search: string
}

interface SearchInputProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export const SearchInput = ({ searchQuery, onSearchChange }: SearchInputProps) => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      search: searchQuery
    }
  })

  const [isFocused, setIsFocused] = useState(false)

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="gray" style={styles.icon} />
      <View style={styles.inputContainer}>
        {!isFocused && !searchQuery && <CustomText style={styles.placeholder}>Type a pokemon name...</CustomText>}
        <Controller
          control={control}
          name="search"
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholderTextColor="transparent"
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    marginHorizontal: 8,
    height: 50
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 8,
    color: 'black',
    fontFamily: 'PoppinsMedium'
  },
  icon: {
    marginLeft: 8
  },
  placeholder: {
    position: 'absolute',
    left: 8,
    color: 'gray',
    fontSize: 16,
    fontFamily: 'PoppinsMedium'
  }
})
