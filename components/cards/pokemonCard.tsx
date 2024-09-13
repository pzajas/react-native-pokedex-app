import palette from '@/constants/palette'
import { PokemonData } from '@/services/api/fetchPokemonData'
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
  const { backgroundColors } = pokemon

  return (
    <Pressable onPress={() => handleNavigatePokemon && handleNavigatePokemon(pokemon)}>
      <View style={[styles.wrapper, { backgroundColor: backgroundColors[0] || palette.typeColors.default }]}>
        <View style={styles.infoContainer}>
          <PokemonCardInfo pokemon={pokemon} />
        </View>
        <PokemonCardImage pokemon={pokemon} />
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
  }
})
