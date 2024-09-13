import { PokemonListCardProps } from '@/typescript/types/interfaces'
import { Image, StyleSheet, View } from 'react-native'

export const PokemonCardImage = ({ pokemon }: PokemonListCardProps) => {
  const { artworkUrl } = pokemon

  return (
    <View style={styles.imageContainer}>
      <Image source={{ uri: artworkUrl }} style={styles.image} />
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
