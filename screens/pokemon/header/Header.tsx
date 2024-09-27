import { capitalize } from 'lodash'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { useNameLocalSearchParams } from '@/hooks/useNameLocalSearchParams'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { checkIfFavorite, toggleFavoritePokemon } from '@/services/firebase/firebaseFunctions'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getPokemonTypeColor } from '@/utils/colors/getPokemonTypeColor'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'

import palette from '@/constants/palette'
import debounce from 'lodash/debounce'

export const Header = () => {
  const { navigateBack } = useNavigateBack()
  const { name } = useNameLocalSearchParams()
  const { shortenedId, extendedId, url, types: typesArray } = usePokemonData(name)
  const [isFavorite, setIsFavorite] = useState(false)

  const backgroundColor = getPokemonTypeColor(typesArray[0])

  useEffect(() => {
    const checkFavorite = async () => {
      const isFavoritePokemon = await checkIfFavorite(shortenedId)

      setIsFavorite(isFavoritePokemon)
    }

    checkFavorite()
  }, [shortenedId])

  const handleToggleFavorite = debounce(() => {
    toggleFavoritePokemon(
      { name, shortenedId, extendedId, backgroundColor, typesArray, url },

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
