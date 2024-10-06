import { typography } from '@/constants/typography'
import { View } from 'react-native'
import { PokeTabSectionHeader } from '../../../PokeTabSectionHeader'
import { PokemonCry } from './PokemonCry'

interface PokemonCriesProps {
  latest: string
  legacy: string
}

export const PokemonCries = ({ latest, legacy }: PokemonCriesProps) => {
  return (
    <View>
      <PokeTabSectionHeader title={typography.tabs.cries} />
      <PokemonCry soundUrl={latest} />
      <PokemonCry soundUrl={legacy} />
    </View>
  )
}
