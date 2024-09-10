// About.tsx
import { CustomText } from '@/components/typography/customText'
import { filterPokemonDescriptions } from '@/utils/arrays/filterPokemonDescriptions'
import { getRandomItem } from '@/utils/arrays/getRandomArrayItem'
import { formatPokemonDescription } from '@/utils/formatters/formatPokemonDescription'
import { StyleSheet, View } from 'react-native'
import { Breeding } from './components/PokemonBreeding'
import { Information } from './components/PokemonInformation'

export const About = ({ currentPokemon }: any) => {
  const [pokemonCategory] = currentPokemon?.category.split(' ') || []

  const descriptions = currentPokemon?.descriptions || []
  const filteredDescriptions = filterPokemonDescriptions(descriptions)
  const description = filteredDescriptions.length > 0 ? getRandomItem(filteredDescriptions) : 'No description available'
  const formattedDescription = formatPokemonDescription(description)

  const formattedHeight = (currentPokemon?.height || 0) / 10 + 'm'
  const formattedWeight = (currentPokemon?.weight || 0) / 10 + 'kg'
  const malePercentage = currentPokemon?.gender?.male || 0
  const femalePercentage = currentPokemon?.gender?.female || 0
  const abilities = currentPokemon?.abilities[0] || 'N/A'

  return (
    <View style={styles.container}>
      <CustomText weight="semibold" style={{ marginBottom: 10 }}>
        Description
      </CustomText>
      <CustomText style={styles.description}>{formattedDescription}</CustomText>

      <Information
        height={formattedHeight}
        weight={formattedWeight}
        pokemonCategory={pokemonCategory}
        abilities={abilities}
      />
      <Breeding malePercentage={malePercentage} femalePercentage={femalePercentage} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'space-around',
    gap: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 8
  }
})
