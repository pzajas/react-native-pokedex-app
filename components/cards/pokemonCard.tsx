import constants from '@/constants/constants'
import palette from '@/constants/palette'
import { PokemonType } from '@/typescript/types/pokemonTypes'
import { capitalizeFirstLetter } from '@/utils/formatters/capitalizeFirstLetter'
import { formatPokemonId } from '@/utils/formatters/formatPokemonId'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { TypeChip } from '../chips/typeChip'
import { CustomText } from '../typography/customText'

const ARTWORK_API_URL = constants.api.ARTWORK_API_URL

export const PokemoneCard = ({ item, handleNavigatePokemon }: { item: any; handleNavigatePokemon: any }) => {
  const capitalizedName = capitalizeFirstLetter(item.name)
  const formattedId = formatPokemonId(item.id)
  const artworkUrl = `${ARTWORK_API_URL}/${item.id}.png`

  const primaryType: PokemonType = item.types[0] || 'default'
  const backgroundColor = palette.typeColors[primaryType] || palette.typeColors.default

  return (
    <Pressable onPress={handleNavigatePokemon}>
      <View style={[styles.wrapper, { backgroundColor }]}>
        <View style={{ justifyContent: 'space-between' }}>
          <CustomText>#{formattedId}</CustomText>
          <CustomText style={{ fontSize: 25, color: palette.light.textLight }}>{capitalizedName}</CustomText>
          <CustomText>
            {item?.types.map((type: PokemonType, index: number) => (
              <TypeChip type={type} key={`${item.id}-${index}`} />
            ))}
          </CustomText>
        </View>

        <View>
          <Image source={{ uri: artworkUrl }} style={styles.image} />
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: 130,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative'
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    position: 'absolute',
    top: -20,
    right: 0
  }
})
