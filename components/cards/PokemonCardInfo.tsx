// Information.tsx
import { StyleSheet, View } from 'react-native'

import { PokemonData } from '@/services/api/fetchPokemonData'

import { TypeChip } from '../chips/typeChip'
import { CustomText } from '../typography/customText'

import { capitalize } from 'lodash'

import palette from '@/constants/palette'

export const PokemonCardInfo = ({ pokemon }: { pokemon: PokemonData }) => {
  const { name, extendedId, types } = pokemon

  return (
    <View style={styles.textContainer}>
      <CustomText style={styles.idText}>#{extendedId}</CustomText>
      <CustomText style={styles.nameText}>{capitalize(name)}</CustomText>
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
