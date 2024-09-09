import { BugIcon } from '@/assets/icons/BugIcon'
import { FireIcon } from '@/assets/icons/FireIcon'
import { GrassIcon } from '@/assets/icons/GrassIcon'
import { PokemonType } from '@/typescript/types/pokemonTypes'

export const getIconComponent = (type: PokemonType) => {
  switch (type) {
    case 'fire':
      return FireIcon
    case 'bug':
      return BugIcon
    case 'grass':
      return GrassIcon
    default:
      return FireIcon // Or some default icon if preferred
  }
}
