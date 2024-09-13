import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { usePokemonData } from '@/services/api/fetchPokemonData'

import palette from '@/constants/palette'
import { typography } from '@/constants/typography'

export default function FetchingScreen() {
  const router = useRouter()
  const { isFetching, isFetched, error } = usePokemonData()

  useEffect(() => {
    if (!isFetching && isFetched) {
      router.replace('/(tabs)/')
    }
  }, [isFetching, isFetched, router])

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {typography.somethingWentWrong} {error.message}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <LoadingIndicator />
      <Text style={styles.text}>{typography.loadingData}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: palette.colors.white
  },
  text: {
    fontSize: 18,
    color: palette.colors.grey
  },
  errorText: {
    fontSize: 18,
    color: palette.colors.red
  }
})
