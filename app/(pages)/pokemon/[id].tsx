import constants from '@/constants/constants'
import palette from '@/constants/palette'
import { Header } from '@/screens/pokemon/main/Header'
import { PokeTabs } from '@/screens/pokemon/tab/PokeTabs'
import { queryClient } from '@/services/tanstack/queryClient'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useQuery } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'

const ARTWORK_API_URL = constants.api.ARTWORK_API_URL

export default function PokemonScreen() {
  const { id } = useLocalSearchParams()

  const { data: pokemonData } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData[]>(['pokemonData']),
    staleTime: Infinity
  })

  const currentPokemon = pokemonData?.find((pokemon) => pokemon?.name === id)
  const artworkUrl = `${ARTWORK_API_URL}/${currentPokemon?.id}.png`

  const primaryType = currentPokemon?.types[0] || 'default'
  const backgroundColor = palette.typeColors[primaryType] || palette.typeColors.default
  const pokeball = require('../../../assets/images/pokeball.png')

  return (
    <View style={[styles.outerContainer, { backgroundColor }]}>
      <Header currentPokemon={currentPokemon} />
      <View style={styles.secondView}>
        <Image
          source={pokeball}
          style={{
            width: 500,
            height: 500,
            position: 'absolute',
            alignSelf: 'center',
            top: -270,
            opacity: 0.1,
            tintColor: 'white'
          }}
        />
        <Image source={{ uri: artworkUrl }} style={styles.pokemonImage} />
        <PokeTabs currentPokemon={currentPokemon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  secondView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'relative',
    height: '60%'
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: -180,
    alignSelf: 'center',
    zIndex: 100
  }
})
