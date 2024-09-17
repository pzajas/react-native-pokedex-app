import { Image, StyleSheet, View } from 'react-native'

import { pokemonTypeIcons } from '@/utils/icons/pokemonTypeIcons'

import { CustomText } from '../../../../components/typography/customText'

import palette from '@/constants/palette'

export const TypeChip = ({ type }: { type: string }) => {
  const cleanType = type.replace(' Type', '').toLowerCase() as keyof typeof pokemonTypeIcons

  const backgroundColor = palette.chipColors[cleanType] || palette.chipColors.normal
  const icon = pokemonTypeIcons[cleanType] || pokemonTypeIcons['normal']

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
    color: palette.colors.white
  },
  icon: {
    width: 20,
    height: 30
  }
})
