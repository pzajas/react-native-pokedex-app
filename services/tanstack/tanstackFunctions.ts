import { useQuery } from '@tanstack/react-query'
import { fetchFavoritePokemons } from '../firebase/firebaseFunctions'

export const useFavoritePokemonsQuery = (isFavoritesFilterActive: boolean) => {
  return useQuery({
    queryKey: ['favoritePokemons'],
    queryFn: fetchFavoritePokemons,
    enabled: isFavoritesFilterActive,
    staleTime: 1000 * 60 * 5
  })
}
