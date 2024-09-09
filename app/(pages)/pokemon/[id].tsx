import { Text, View } from '@/components/Themed'
import { queryClient } from '@/services/tanstack/queryClient'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function PokemonScreen() {
  const { id } = useLocalSearchParams()

  const { data: pokemonData } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData[]>(['pokemonData']),
    staleTime: Infinity
  })

  const currentPokemon = pokemonData?.find((pokemon) => pokemon?.name === id)
  const types = currentPokemon?.types?.map((type: any) => type?.type?.name).join(', ') || 'N/A'

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id}</Text>
      <Text style={styles.title}>Name: {currentPokemon?.name}</Text>
      <Text style={styles.title}>Types: {types}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
