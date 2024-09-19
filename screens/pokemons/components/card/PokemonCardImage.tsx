import constants from '@/constants/constants'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import React, { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const PokemonCardImage = ({ pokemon }: { pokemon: PokemonData }) => {
  const artworkUrl = constants.api.ARTWORK_API_URL
  const imageUrl = `${artworkUrl}/${pokemon.shortenedId}.png`

  const [imageError, setImageError] = useState(false)

  return (
    <View style={styles.imageContainer}>
      {imageError ? (
        <Text>Image failed to load</Text>
      ) : (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onError={(error) => {
            console.error('Image failed to load:', error.nativeEvent.error)
            setImageError(true)
          }}
        />
      )}
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
    height: 140
  }
})
