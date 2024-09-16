import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet } from 'react-native'

import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getGenderRate } from '@/utils/pokemon/getGenderRate'

import { Breeding } from './components/breeding/PokemonBreeding'
import { PokemonDescription } from './components/description/PokemonDescription'
import { Information } from './components/information/PokemonInformation'

export const About = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { description, genderRate } = usePokemonData(name)

  const { malePercentage, femalePercentage } = getGenderRate(genderRate)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerStyle}>
      <PokemonDescription description={description} />
      <Information />
      <Breeding malePercentage={malePercentage} femalePercentage={femalePercentage} />
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
  contentContainerStyle: {
    flex: 1
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
