import { CustomText } from '@/components/typography/customText'
import palette from '@/constants/palette'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { usePokemonData } from '@/services/api/fetchPokemonData'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'
import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export const Header = () => {
  const { toggleFavorite } = usePokemonData()
  // const {
  //   backgroundColor,
  //   name,
  //   isFavorite
  // }: { backgroundColor: string; name: string; id: string; types: string[]; isFavorite: any } = useLocalSearchParams()
  const navigateBack = useNavigateBack()

  const params = useLocalSearchParams()
  const {
    backgroundColors,
    backgroundColor,
    name,
    shortenedId, // You might need to adjust this to the correct parameter names
    extendedId,
    types,
    isFavorite
  } = params
  const isFavoritePokemon = isFavorite === 'true' || (Array.isArray(isFavorite) && isFavorite.includes('true'))

  console.log(params)

  const butterfree: PokemonData = {
    name: 'butterfree',
    shortenedId: 12, // Butterfree's ID
    extendedId: '012', // Butterfree's extended ID as string
    backgroundColors: ['#aac634', '#95addf'], // Background colors for Butterfree
    chipColors: ['#8f9f2c', '#7890bf'], // Chip colors for Butterfree
    types: ['Bug', 'Flying'], // Types for Butterfree
    url: 'https://pokeapi.co/api/v2/pokemon/12/', // URL for Butterfree's details
    isFavorite: false // Defaulting to false (or set to true if it's a favorite)
  }

  console.log(isFavoritePokemon)

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor: backgroundColor
        }}
      >
        <IconButton name={'chevron-left'} size={32} color={palette.colors.white} onPress={navigateBack} />
        <CustomText style={styles.text}>{capitalize(name)}</CustomText>
        <IconButton
          name={isFavoritePokemon ? 'cards-heart' : 'cards-heart-outline'}
          size={28}
          color={isFavoritePokemon === true ? palette.colors.red.medium : palette.colors.white}
          onPress={() => toggleFavorite(butterfree)}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: palette.colors.white
  }
})
