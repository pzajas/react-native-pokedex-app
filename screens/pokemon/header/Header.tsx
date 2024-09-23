import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { checkIfFavorite, toggleFavoritePokemon } from '@/services/firebase/firebaseFunctions'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'

import palette from '@/constants/palette'
import debounce from 'lodash/debounce'

export const Header = () => {
  const navigateBack = useNavigateBack()
  const { name, shortenedId, extendedId, url, types, chip, backgroundColors } = useLocalSearchParams()
  const [isFavorite, setIsFavorite] = useState(false)

  const backgroundColorsArray = backgroundColors?.split(',').map((color: string) => color.trim())
  const typesArray = types?.split(',').map((color: string) => color.trim())
  const chipColorsArray = chip?.split(',').map((color: string) => color.trim())

  useEffect(() => {
    const checkFavoriteDebounced = debounce(async () => {
      const isFav = await checkIfFavorite(shortenedId)
      setIsFavorite(isFav)
    }, 1000)

    checkFavoriteDebounced()

    return () => {
      checkFavoriteDebounced.cancel()
    }
  }, [shortenedId])

  const handleToggleFavorite = debounce(() => {
    toggleFavoritePokemon(
      { name, shortenedId, extendedId, backgroundColorsArray, chipColorsArray, typesArray, url },
      setIsFavorite
    )
  }, 1000)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <IconButton name={'chevron-left'} size={32} color={palette.colors.white} onPress={navigateBack} />
        <CustomText style={styles.text}>{capitalize(name)}</CustomText>
        <IconButton
          name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
          size={28}
          color={isFavorite ? palette.colors.red.medium : palette.colors.white}
          onPress={handleToggleFavorite}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16
  },
  text: {
    fontSize: 20,
    color: palette.colors.white
  }
})
