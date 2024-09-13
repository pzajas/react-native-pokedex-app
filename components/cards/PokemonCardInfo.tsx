// Information.tsx
import palette from '@/constants/palette'
import { PokemonListCardProps } from '@/typescript/types/interfaces'
import { StyleSheet, View } from 'react-native'
import { TypeChip } from '../chips/TypeChip'
import { CustomText } from '../typography/customText'

export const PokemonCardInfo = ({ pokemon }: PokemonListCardProps) => {
  const { pokemonNameCapitalized, pokemonExtendedId, types } = pokemon

  return (
    <View style={styles.textContainer}>
      <CustomText style={styles.idText}>#{pokemonExtendedId}</CustomText>
      <CustomText style={styles.nameText}>{pokemonNameCapitalized}</CustomText>
      <View style={styles.chipContainer}>
        {types.map((type, index) => (
          <TypeChip type={type} key={index} />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  idText: {
    color: palette.light.textLight
  },
  nameText: {
    fontSize: 25,
    color: palette.light.textLight
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})
