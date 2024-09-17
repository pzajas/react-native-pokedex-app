import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'
import { formatText } from '@/utils/formatters/formatTextString'

import { PokeTabSectionHeader } from '../../../PokeTabSectionHeader'

import palette from '@/constants/palette'

export const PokemonDescription = ({ description }: { description: string }) => {
  return (
    <View>
      <PokeTabSectionHeader title={typography.tabs.description} />
      <CustomText style={styles.descriptionText} numberOfLines={3}>
        {formatText(description)}
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionText: {
    textAlign: 'justify',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10
  },
  title: {
    marginBottom: 10
  },
  noDescription: {
    fontSize: 14,
    color: palette.colors.grey.medium
  }
})
