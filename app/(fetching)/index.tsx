import { fetchPokemonData } from '@/services/api/fetchPokemonData'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function FetchingScreen() {
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    console.log('fetching...')

    setTimeout(() => {
      queryClient.prefetchQuery({
        queryKey: ['pokemonData'],
        queryFn: fetchPokemonData
      })
    }, 3000)
  }, [queryClient])

  const { isFetched: pokemonsFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemonData,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    if (pokemonsFetched) {
      router.replace('/(tabs)/')
    }
  }, [pokemonsFetched, router])

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#6200ee" style={styles.spinner} />
      <Text style={styles.text}>Fetching data...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  spinner: {
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    color: '#333'
  }
})
