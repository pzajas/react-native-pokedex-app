import { useMemo } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Header } from '@/screens/pokemon/header/Header'
import { PokeTabs } from '@/screens/pokemon/tabs/PokeTabs'
import { usePokemonData } from '@/services/hooks/usePokemonData'

import { useNameLocalSearchParams } from '@/hooks/useNameLocalSearchParams'
import { getPokemonTypeColor } from '@/utils/colors/getPokemonTypeColor'

import palette from '@/constants/palette'

export default function PokemonScreen() {
  const { name } = useNameLocalSearchParams()
  const { url, types } = usePokemonData(name)

  const pokeballImage = require('../../../assets/images/pokeball.png')
  const pokemonImageSource = url ? { uri: url } : pokeballImage
  const pokemonTypeDatabaseColor = useMemo(() => getPokemonTypeColor(types[0]), [types])

  return (
    <SafeAreaView style={[styles.outerContainer, { backgroundColor: pokemonTypeDatabaseColor }]} edges={['top']}>
      <Header />
      <View style={styles.tabContainer}>
        <Image source={pokeballImage} style={styles.pokeballImage} />
        <Image source={pokemonImageSource} style={styles.pokemonImage} />
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
