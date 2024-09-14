import { useLocalSearchParams } from 'expo-router'
import { ScrollView, StyleSheet, View } from 'react-native'

import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getGenderRate } from '@/utils/pokemon/getGenderRate'

import { Breeding } from './components/breeding/PokemonBreeding'
import { PokemonDescription } from './components/description/PokemonDescription'
import { Information } from './components/information/PokemonInformation'

export const About = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { species, isLoading, isError } = usePokemonData(name)

  const { description, genderRate } = species ?? {}
  const { malePercentage, femalePercentage } = getGenderRate(genderRate)

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <LoadingIndicator />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <CustomText>{typography.errorLoadingData}</CustomText>
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
    justifyContent: 'space-between',
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
