import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useRouter } from 'expo-router'

export const useNavigatePokemon = () => {
  const router = useRouter()

  const handleNavigatePokemon = (item: PokemonData) => {
    router.push({
      pathname: '/pokemon/[name]',
      params: {
        id: item.shortenedId,
        name: item.name,
        capitalizedName: item.pokemonNameCapitalized,
        artwork: item.artworkUrl,
        backgroundColor: item.backgroundColors[0] || 'defaultBackgroundColor',
        chip: item.chipColors[0] || 'defaultChipColor',
        types: item.types
      }
    })
  }

  return handleNavigatePokemon
}
