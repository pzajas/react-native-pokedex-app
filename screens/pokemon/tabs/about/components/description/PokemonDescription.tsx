import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'

import palette from '@/constants/palette'
import { typography } from '@/constants/typography'
import { formatPokemonDescription } from '@/utils/formatters/formatPokemonDescription'

export const PokemonDescription = ({ description }: { description: string }) => {
  console.log(description)

  return (
    <View>
      <CustomText weight="semibold" style={styles.title}>
        {typography.description}
      </CustomText>
      <CustomText style={styles.descriptionText} numberOfLines={3}>
        {formatPokemonDescription(description)}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionText: {
    textAlign: 'justify',
    fontSize: 16,
    lineHeight: 24
  },
  title: {
    marginBottom: 10
  },
  noDescription: {
    fontSize: 16,
    color: palette.colors.grey.medium
  }
})
