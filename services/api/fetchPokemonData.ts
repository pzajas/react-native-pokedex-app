import { PokemonDetails, StatsAccumulator } from '@/typescript/types/pokemonTypes'
import axios from 'axios'
import constants from '../../constants/constants'
import { queryClient } from '../tanstack/queryClient'

const POKE_API_URL = constants.api.POKE_API_URL

// Helper function to calculate gender percentages
const calculateGenderPercentage = (genderRate: number) => {
  if (genderRate === -1) {
    return { male: 0, female: 0, genderless: true } // Genderless Pokémon
  }

  const malePercentage = ((8 - genderRate) / 8) * 100
  const femalePercentage = (genderRate / 8) * 100

  return { male: malePercentage, female: femalePercentage, genderless: false }
}

export const fetchPokemonData = async () => {
  try {
    const pokemonListResponse = await axios.get(POKE_API_URL, {
      params: {
        offset: 0,
        limit: 151
      }
    })

    const pokemonList = pokemonListResponse.data.results

    const detailedPokemons = await Promise.all(
      pokemonList.map(async (pokemon: { url: string }) => {
        const detailsResponse = await axios.get<PokemonDetails>(pokemon.url)
        const details = detailsResponse.data

        const speciesUrl = details.species.url
        const speciesResponse = await axios.get(`${speciesUrl}`)
        const speciesData = speciesResponse.data

        // Find the category name in English
        const category = speciesData.genera.find(
          (genus: { language: { name: string }; genus: string }) => genus.language.name === 'en'
        )

        // Collect all descriptions
        const descriptions = speciesData.flavor_text_entries
          .filter((entry: { language: { name: string } }) => entry.language.name === 'en')
          .map((entry: { flavor_text: string }) => entry.flavor_text.replace(/\s+/g, ' ').trim())

        // Calculate gender percentages
        const genderRate = speciesData.gender_rate
        const gender = calculateGenderPercentage(genderRate)

        return {
          id: details.id,
          name: details.name,
          types: details.types.map((type) => type.type.name),
          image: details.sprites.front_default,
          stats: details.stats.reduce<StatsAccumulator>((acc, stat) => {
            acc[stat.stat.name] = stat.base_stat
            return acc
          }, {}),
          weight: details.weight,
          height: details.height,
          abilities: details.abilities.map((ability) => ability.ability.name),
          color: speciesData.color.name, // Add the color field from species endpoint
          category: category ? category.genus : 'Unknown', // Add category in English
          descriptions: descriptions.length > 0 ? descriptions : ['No description available'], // Add all descriptions in English
          gender: gender // Add gender information (male %, female %, genderless)
        }
      })
    )

    queryClient.setQueryData(['pokemonData'], detailedPokemons)

    return detailedPokemons
  } catch (error) {
    console.error('Error fetching Pokémon data:', error)
    throw error
  }
}
