import palette from '@/constants/palette'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { Pressable, StyleSheet, View } from 'react-native'
import { PokemonCardImage } from './PokemonCardImage'
import { PokemonCardInfo } from './PokemonCardInfo'

export const PokemonCard = ({
  pokemon,
  handleNavigatePokemon
}: {
  pokemon: PokemonData
  handleNavigatePokemon: any
}) => {
  const { name, shortenedId, backgroundColor } = pokemon

  return (
    <Pressable onPress={() => handleNavigatePokemon && handleNavigatePokemon(name, shortenedId)}>
      <View style={[styles.wrapper, { backgroundColor: backgroundColor || palette.typeColors.default }]}>
        <View style={styles.infoContainer}>
          <PokemonCardInfo pokemon={pokemon} />
        </View>
        <View style={styles.imageContainer}>
          <PokemonCardImage pokemon={pokemon} />
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
    position: 'relative',
    width: 140,
    height: 140
  }
})
