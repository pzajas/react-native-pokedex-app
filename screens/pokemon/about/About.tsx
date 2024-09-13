import { CustomText } from '@/components/typography/customText'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { useLocalSearchParams } from 'expo-router'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import { Breeding } from './components/PokemonBreeding'
import { PokemonDescription } from './components/PokemonDescription'
import { Information } from './components/PokemonInformation'

export const About = () => {
  const { name } = useLocalSearchParams()
  const { species, isLoading, isError } = usePokemonData(name)

  const { description, genderRate } = species ?? {}

  let malePercentage, femalePercentage

  if (genderRate !== -1) {
    femalePercentage = genderRate * 12.5
    malePercentage = (8 - genderRate) * 12.5
  } else {
    malePercentage = 0
    femalePercentage = 0
  }

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <CustomText>Error loading data</CustomText>
      </View>
    )
  }

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
    padding: 16,
    gap: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 8
  },
  contentContainerStyle: {
    flex: 1,
    justifyContent: 'space-between'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
