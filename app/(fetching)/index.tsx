import { fetchPokemonData } from '@/services/api/fetchPokemons'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

export default function FetchingScreen() {
  const router = useRouter()

  const { isFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: fetchPokemonData,
    staleTime: 1000 * 60 * 5
  })

  useEffect(() => {
    setTimeout(() => {
      if (isFetched) {
        router.replace('/(tabs)/')
      }
    }, 1000)
  }, [isFetched, router])

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
