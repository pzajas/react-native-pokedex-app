import { useLocalSearchParams } from 'expo-router'

import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getEvolutions } from '@/utils/pokemon/getEvolutions'

import { TabSectionHeader } from '@/components/headers/TabSectionHeader'
import { typography } from '@/constants/typography'
import { EvolutionsList } from './components/EvolutionsList'

export const Evolutions = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { evolutions } = usePokemonData(name)

  const evolutionList = evolutions ? getEvolutions(evolutions.chain) : []

  return (
    <>
      <TabSectionHeader title={typography.tabs.evolutions} />
      <EvolutionsList evolutionList={evolutionList} />
    </>
  )
}
