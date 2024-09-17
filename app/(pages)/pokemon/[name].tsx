import constants from '@/constants/constants'
import palette from '@/constants/palette'
import { Header } from '@/screens/pokemon/header/Header'
import { PokeTabs } from '@/screens/pokemon/tabs/PokeTabs'
import { addFavoritePokemon, isFavoritePokemon } from '@/services/firebase/firebaseFunctions'
import { formatPokemonId } from '@/utils/formatters/formatPokemonId'
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function PokemonScreen() {
  const [isFavorite, setIsFavorite] = useState<boolean | null>(null)
  const { backgroundColor, id, name, chip, types } = useLocalSearchParams()
  const typesArray = typeof types === 'string' ? types.split(',').map((type) => type.trim()) : []

  const pokeballImage = require('../../../assets/images/pokeball.png') || ''
  const pokemonTypeColor = (backgroundColor as string) || ''
  const pokemonImageUri = `${constants.api.ARTWORK_API_URL}/${id}.png` || ''

  useEffect(() => {
    const checkIfFavorite = async () => {
      if (name) {
        const favoriteStatus = await isFavoritePokemon(name)
        setIsFavorite(favoriteStatus)
      }
    }
    checkIfFavorite()
  }, [name])

  const handleFavoriteToggle = async () => {
    if (name) {
      const newStatus = !(await isFavoritePokemon(name))
      setIsFavorite(newStatus)

      if (newStatus) {
        const pokemonDetails = {
          backgroundColors: [backgroundColor],
          chipColors: [chip],
          extendedId: formatPokemonId(id),
          name: name,
          shortenedId: id,
          types: typesArray,
          url: `${constants.api.ARTWORK_API_URL}/${id}.png`
        }
        await addFavoritePokemon(pokemonDetails)
      }
    }
  }

  return (
    <SafeAreaView style={[styles.outerContainer, { backgroundColor: pokemonTypeColor }]} edges={['top']}>
      <Header isFavorite={isFavorite || false} onFavoriteToggle={handleFavoriteToggle} />
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
