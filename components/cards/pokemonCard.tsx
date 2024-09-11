import constants from '@/constants/constants'
import palette from '@/constants/palette'
import { PokemonType } from '@/typescript/types/pokemonTypes'
import { formatPokemonId } from '@/utils/formatters/formatPokemonId'
import { capitalize } from 'lodash'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { TypeChip } from '../chips/typeChip'
import { CustomText } from '../typography/customText'

const ARTWORK_API_URL = constants.api.ARTWORK_API_URL

export const PokemoneCard = ({ item, handleNavigatePokemon }: { item: any; handleNavigatePokemon: any }) => {
  const capitalizedName = capitalize(item.name)
  const formattedId = formatPokemonId(item.id)
  const artworkUrl = `${ARTWORK_API_URL}/${item.id.toString().replace(/^0+/, '')}.png`

  const primaryType: PokemonType = item.types[0] || 'default'
  const backgroundColor = palette.typeColors[primaryType] || palette.typeColors.default

  return (
    <Pressable onPress={() => handleNavigatePokemon(item)}>
      <View style={[styles.wrapper, { backgroundColor }]}>
        <View style={styles.textContainer}>
          <CustomText style={{ color: palette.light.textLight }}>#{formattedId}</CustomText>
          <CustomText style={styles.nameText}>{capitalizedName}</CustomText>
          <CustomText>
            {item?.types.map((type: PokemonType, index: number) => (
              <TypeChip type={type} key={`${item.id}-${index}`} />
            ))}
          </CustomText>
        </View>

        <View style={styles.imageContainer}>
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
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textContainer: {
    justifyContent: 'space-between'
  },
  nameText: {
    fontSize: 25,
    color: palette.light.textLight
  },
  imageContainer: {
    position: 'relative',
    width: 140,
    height: 140
  },
  image: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1
  }
})
