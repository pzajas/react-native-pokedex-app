import palette from '@/constants/palette'
import { PokemonType } from '@/typescript/types/pokemonTypes'
import { pokemonTypeIcons } from '@/utils/icons/pokemonTypeIcons'
import { Image, StyleSheet, View } from 'react-native'
import { CustomText } from '../typography/customText'

interface TypeChipProps {
  type: PokemonType
}

export const TypeChip = ({ type }: TypeChipProps) => {
  // Clean type name and ensure it matches with icon keys
  const cleanType = type.replace(' Type', '').toLowerCase() as keyof typeof pokemonTypeIcons

  // Get background color and icon for the type
  const backgroundColor = palette.chipColors[cleanType] || palette.chipColors.default
  const icon = pokemonTypeIcons[cleanType] || pokemonTypeIcons['default']

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Image source={icon} style={styles.icon} />
      <CustomText style={styles.text}>{cleanType}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  text: {
    color: palette.light.textLight
  },
  icon: {
    width: 20,
    height: 30
  }
})
