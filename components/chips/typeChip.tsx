import palette from '@/constants/palette'
import { PokemonType } from '@/typescript/types/pokemonTypes'
import { pokemonTypeIcons } from '@/utils/icons/pokemonTypeIcons'
import { Image, StyleSheet, View } from 'react-native'
import { CustomText } from '../typography/customText'

export const TypeChip = ({ type }: { type: PokemonType }) => {
  const cleanType = type.replace(' Type', '') as keyof typeof pokemonTypeIcons

  const backgroundColor = palette.chipColors[cleanType] || palette.chipColors.default
  const icon = pokemonTypeIcons[cleanType] || pokemonTypeIcons['default']

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Image source={icon} style={{ width: 20, height: 30 }} />
      <CustomText style={styles.text}>{cleanType}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  text: {
    color: palette.light.textLight
  }
})
