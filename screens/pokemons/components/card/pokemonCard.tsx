import palette from '@/constants/palette'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { Pressable, StyleSheet, View } from 'react-native'
import { IconButton } from '../search/SearchBarButton'
import { PokemonCardImage } from './PokemonCardImage'
import { PokemonCardInfo } from './PokemonCardInfo'

export const PokemonCard = ({
  pokemon,
  handleNavigatePokemon,
  onToggleFavorite,
  isFavorite
}: {
  pokemon: PokemonData
  handleNavigatePokemon: any
  onToggleFavorite: any
  isFavorite: boolean
}) => {
  const { backgroundColors } = pokemon

  return (
    <Pressable onPress={() => handleNavigatePokemon && handleNavigatePokemon(pokemon)}>
      <View style={[styles.wrapper, { backgroundColor: backgroundColors[0] || palette.typeColors.default }]}>
        <View style={styles.infoContainer}>
          <PokemonCardInfo pokemon={pokemon} />
        </View>
        <View style={styles.imageContainer}>
          <PokemonCardImage pokemon={pokemon} />
          <View style={styles.favoriteButton}>
            <IconButton
              name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
              size={20}
              color={isFavorite ? palette.colors.red.medium : palette.colors.white}
              onPress={onToggleFavorite}
            />
          </View>
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
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  imageContainer: {
    position: 'relative', // Keep it relative for absolute positioning of the favorite button
    width: 140,
    height: 140
  },
  favoriteButton: {
    position: 'absolute',
    top: 10, // Adjust to place it on the image
    right: -5, // Adjust to place it on the image
    zIndex: 200
  },
  favoriteText: {
    fontSize: 30, // Adjust size if needed
    zIndex: 200
  }
})
