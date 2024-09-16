import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'

import { Header } from '@/screens/pokemon/header/Header'
import { PokeTabs } from '@/screens/pokemon/tabs/PokeTabs'

import constants from '@/constants/constants'
import palette from '@/constants/palette'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PokemonScreen() {
  const { backgroundColor, id } = useLocalSearchParams()

  const pokeballImage = require('../../../assets/images/pokeball.png') || ''
  const pokemonTypeColor = (backgroundColor as string) || ''
  const pokemonImageUri = `${constants.api.ARTWORK_API_URL}/${id}.png` || ''

  return (
    <SafeAreaView style={[styles.outerContainer, { backgroundColor: pokemonTypeColor }]} edges={['top']}>
      <Header />
      <View style={styles.tabContainer}>
        <Image source={pokeballImage} style={styles.pokeballImage} />
        <Image source={{ uri: pokemonImageUri }} style={styles.pokemonImage} />
        <PokeTabs />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'space-between',
    flex: 1
  },
  tabContainer: {
    justifyContent: 'flex-end',
    position: 'relative',
    height: '60%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  pokemonImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: 250,
    height: 250,
    top: -200,
    zIndex: 100
  },
  pokeballImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: 450,
    height: 450,
    top: -275,
    zIndex: 50,
    opacity: 0.1,
    tintColor: palette.colors.white
  }
})
