import axios from 'axios'
import constants from '../../constants/constants'
import { queryClient } from '../tanstack/queryClient'

const POKE_API_URL = constants.api.POKE_API_URL

export const fetchPokemonData = async () => {
  try {
    const response = await axios.get(POKE_API_URL, {
      params: {
        offset: 0
      }
    })

    const pokemonData = response.data
    queryClient.setQueryData(['pokemon'], pokemonData)
    return pokemonData
  } catch (error) {
    throw error
  }
}
