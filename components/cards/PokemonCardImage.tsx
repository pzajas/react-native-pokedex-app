import { Image, StyleSheet, View } from 'react-native'

import { PokemonData } from '@/typescript/types/pokemonTypes'

import constants from '@/constants/constants'

export const PokemonCardImage = ({ pokemon }: { pokemon: PokemonData }) => {
  const artworkUrl = constants.api.ARTWORK_API_URL

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: `${artworkUrl}/${pokemon.shortenedId}.png` }} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
    height: 140
  },
  image: {
    resizeMode: 'contain',
    width: 140,
    height: 140,
    zIndex: 100
  }
})
