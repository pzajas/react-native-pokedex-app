import { useNameLocalSearchParams } from '@/hooks/useNameLocalSearchParams'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { ScrollView, StyleSheet } from 'react-native'
import { PokemonCries } from './components/PokemonCries'

export const Media = () => {
  const { name } = useNameLocalSearchParams()
  const { cries } = usePokemonData(name)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {<PokemonCries latest={cries.latest} legacy={cries.legacy} />}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 8
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
})
