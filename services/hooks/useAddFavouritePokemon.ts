import { addFavoritePokemon } from '@/services/firebase/firebaseFunctions'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useAddFavoritePokemon = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addFavoritePokemon,
    onMutate: async (newPokemon) => {
      await queryClient.cancelQueries(['favoritePokemons'])

      const previousData = queryClient.getQueryData(['favoritePokemons'])

      queryClient.setQueryData(['favoritePokemons'], (oldData) => [...(oldData || []), newPokemon])

      return { previousData }
    },
    onError: (err, newPokemon, context) => {
      queryClient.setQueryData(['favoritePokemons'], context?.previousData)
    },
    onSettled: () => {
      queryClient.invalidateQueries(['favoritePokemons'])
    }
  })
}
