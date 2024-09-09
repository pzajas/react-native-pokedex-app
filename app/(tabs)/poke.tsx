import { PokemoneCard } from '@/components/cards/pokemonCard'
import { View } from '@/components/Themed'
import { CustomText } from '@/components/typography/customText'
import { queryClient } from '@/services/tanstack/queryClient'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native'

type FormValues = {
  search: string
}

type PokemonRouteParams = {
  id: string
}

export default function PokeScreen() {
  const router = useRouter()
  const { control, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      search: ''
    }
  })
  const searchQuery = watch('search')

  const { data: pokemonData = [], isFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData[]>(['pokemonData']),
    staleTime: Infinity
  })

  const filteredData = useMemo(() => {
    if (!searchQuery) return pokemonData
    return pokemonData.filter((pokemon) => pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [searchQuery, pokemonData])

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: `/(pages)/pokemon/${item.name}` as `/(pages)/pokemon/[id]`,
      params: { id: item.name } as PokemonRouteParams
    })
  }

  const renderItem = ({ item }: { item: PokemonData }) => (
    <View style={styles.itemContainer}>
      <PokemoneCard item={item} handleNavigatePokemon={handleNavigatePokemon} />
    </View>
  )

  return (
    <View style={styles.container}>
      <CustomText>Pokedex</CustomText>
      <Controller
        control={control}
        name="search"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Type a pokemon name..."
            onChangeText={(text) => {
              onChange(text)
            }}
            value={value}
          />
        )}
      />
      {isFetched ? (
        <FlatList data={filteredData} renderItem={renderItem} keyExtractor={(item) => String(item.id)} />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    marginHorizontal: 8,
    borderRadius: 8
  },
  itemContainer: {
    padding: 10
  }
})
