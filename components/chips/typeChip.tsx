import palette from '@/constants/palette'
import { pokemonTypeIcons } from '@/utils/icons/pokemonTypeIcons'
import { Image, StyleSheet, View } from 'react-native'
import { CustomText } from '../typography/customText'

export const TypeChip = ({ type }: { type: string }) => {
  const cleanType = type.replace(' Type', '').toLowerCase() as keyof typeof pokemonTypeIcons

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
