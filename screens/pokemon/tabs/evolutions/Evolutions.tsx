import { useLocalSearchParams } from 'expo-router'

import { typography } from '@/constants/typography'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getEvolutions } from '@/utils/pokemon/getEvolutions'

import { PokeTabSectionHeader } from '../PokeTabSectionHeader'
import { EvolutionsList } from './components/EvolutionsList'

export const Evolutions = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { evolutions } = usePokemonData(name)

  const evolutionList = evolutions ? getEvolutions(evolutions.chain) : []

  return (
    <>
      <PokeTabSectionHeader title={typography.tabs.evolutions} />
      <EvolutionsList evolutionList={evolutionList} />
    </>
  )
}
