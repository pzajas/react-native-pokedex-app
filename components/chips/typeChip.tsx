import palette from '@/constants/palette'
import { PokemonType } from '@/typescript/types/pokemonTypes'
import { StyleSheet, View } from 'react-native'
import { CustomText } from '../typography/customText'

export const TypeChip = ({ type }: { type: PokemonType }) => {
  const backgroundColor = palette.chipColors[type] || palette.chipColors.default

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <CustomText style={styles.text}>{type}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'center'
  },
  text: {
    color: palette.light.textLight
  }
})
