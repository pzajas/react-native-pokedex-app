import axios from 'axios'
import constants from '../../constants/constants'

const POKE_API_URL = constants.api.POKE_API_URL

export const fetchPokemonData = async () => {
  try {
    const response = await axios.get(POKE_API_URL)
    console.log('Data fetched from PokeAPI:', response.data)
  } catch (error) {
    console.error('Error fetching data from PokeAPI:', error)
  }
}
