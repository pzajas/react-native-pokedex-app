import { CustomText } from '@/components/typography/customText'
import constants from '@/constants/constants'
import palette from '@/constants/palette'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { addFavoritePokemon, isFavoritePokemon, removeFavoritePokemon } from '@/services/firebase/firebaseFunctions'
import { formatPokemonId } from '@/utils/formatters/formatPokemonId'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export const Header = () => {
  const { backgroundColor, name, id, types }: { backgroundColor: string; name: string; id: string; types: string[] } =
    useLocalSearchParams()
  const navigateBack = useNavigateBack()
  const queryClient = useQueryClient()

  const { data: isCurrentPokemonFavourite } = useQuery({
    queryKey: ['favoritePokemon', name],
    queryFn: () => {
      return isFavoritePokemon(name)
    },
    enabled: !!name
  })

  const typesArray = Array.isArray(types) ? types : types?.split(',').map((type) => type.trim())

  const toggleFavoriteMutation = useMutation({
    mutationFn: async () => {
      if (isCurrentPokemonFavourite) {
        return removeFavoritePokemon(name)
      } else {
        const pokemonDetails = {
          id,
          backgroundColors: [backgroundColor],
          chipColors: [],
          extendedId: formatPokemonId(id),
          name: name,
          shortenedId: id,
          types: typesArray,
          url: `${constants.api.ARTWORK_API_URL}/${id}.png`
        }

        return addFavoritePokemon(pokemonDetails)
      }
    },
    onMutate: async () => {
      console.log('Optimistically updating favorite status for:', name)
      await queryClient.cancelQueries(['favoritePokemon', name])

      const previousFavoriteStatus = queryClient.getQueryData(['favoritePokemon', name])
      console.log('Previous favorite status:', previousFavoriteStatus)

      queryClient.setQueryData(['favoritePokemon', name], !isCurrentPokemonFavourite)

      return { previousFavoriteStatus }
    },
    onError: (err, variables, context) => {
      console.error('Error toggling favorite status:', err)
      if (context?.previousFavoriteStatus) {
        console.log('Reverting to previous favorite status:', context.previousFavoriteStatus)
        queryClient.setQueryData(['favoritePokemon', name], context.previousFavoriteStatus)
      }
    },
    onSettled: () => {
      console.log('Mutation settled, refetching favorite status for:', name)
      queryClient.invalidateQueries(['favoritePokemon', name])
    }
  })

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
          name={isCurrentPokemonFavourite ? 'cards-heart' : 'cards-heart-outline'}
          size={28}
          color={isCurrentPokemonFavourite ? palette.colors.red.light : palette.colors.white}
          onPress={() => {
            console.log('Heart button pressed, toggling favorite status for:', name)
            toggleFavoriteMutation.mutate()
          }}
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
