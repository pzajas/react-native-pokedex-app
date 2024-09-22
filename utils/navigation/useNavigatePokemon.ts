import constants from '@/constants/constants'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useRouter } from 'expo-router'

export const useNavigatePokemon = () => {
  const router = useRouter()

  const handleNavigatePokemon = (item: PokemonData) => {
    const { shortenedId } = item

    router.push({
      pathname: '/pokemon/[name]',
      params: {
        shortenedId: shortenedId,
        extendedId: item.extendedId,
        name: item.name,
        // backgroundColor: item.backgroundColors[0] || 'defaultBackgroundColor',
        chip: item.chipColors[0] || 'defaultChipColor',
        // types: item.types,
        isFavorite: item.isFavorite,
        backgroundColors: item.backgroundColors,
        types: item.types,
        url: `${constants.api.ARTWORK_API_URL}/${shortenedId}.png` || ''
      }
    })
  }

  return handleNavigatePokemon
}
