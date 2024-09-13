import { CustomText } from '@/components/typography/customText'
import { formatPokemonDescription } from '@/utils/formatters/formatPokemonDescription'
import _ from 'lodash'
import { StyleSheet, View } from 'react-native'

interface PokemonProps {
  description?: Array<{ flavor_text: string; language: { name: string } }>
}

export const PokemonDescription = ({ description }: PokemonProps) => {
  // Ensure description is an array and filter for English language
  const desc = description?.filter((entry) => entry.language?.name === 'en')

  // Sanitize text by removing specific problematic characters and extra spaces
  const sanitizeText = (text: string) => {
    return text
      .replace(/♀/g, '') // Remove problematic characters
      .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      .trim() // Remove leading and trailing spaces
  }

  // Get a random description
  const getRandomDescription = () => {
    if (desc && desc.length > 0) {
      const shuffledDesc = _.shuffle(desc) // Shuffle the array using lodash
      const randomEntry = shuffledDesc[0] // Pick the first entry from the shuffled array
      return sanitizeText(randomEntry.flavor_text)
    }
    return 'No description available.'
  }

  const randomDescription = getRandomDescription()

  return (
    <View style={styles.title}>
      <View>
        <CustomText weight="semibold" style={styles.title}>
          Description
        </CustomText>
        <CustomText style={styles.descriptionText} numberOfLines={3}>
          {formatPokemonDescription(randomDescription)}
        </CustomText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify'
  },
  title: {
    marginBottom: 10
  },
  noDescription: {
    fontSize: 16,
    color: 'grey'
  }
})
