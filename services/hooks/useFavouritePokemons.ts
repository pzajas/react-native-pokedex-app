import { fetchFavoritePokemons } from '@/services/firebase/firebaseFunctions'
import { useQuery } from '@tanstack/react-query'

export const useFavoritePokemons = (isEnabled?: boolean) => {
  return useQuery({
    queryKey: ['favoritePokemons'],
    queryFn: fetchFavoritePokemons,
    staleTime: 60000,
    retry: 1,
    refetchOnWindowFocus: true,
    enabled: !!isEnabled
  })
}
