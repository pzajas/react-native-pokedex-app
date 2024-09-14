import { ImageSourcePropType } from 'react-native'

import { PokemonType } from '@/typescript/types/interfaces'

import { pokemonTypeIcons } from './pokemonTypeIcons'

export const getIconSource = (type: string): ImageSourcePropType => {
  const normalizedType = type.toLowerCase() as PokemonType
  return pokemonTypeIcons[normalizedType] || pokemonTypeIcons.normal
}
