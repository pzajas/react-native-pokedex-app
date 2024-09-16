import { useLocalSearchParams } from 'expo-router'

import { usePokemonData } from '@/services/hooks/usePokemonData'
import { formatMoveName } from '@/utils/formatters/formatMoveName'

import { MovesList } from './components/MovesList'

import { TabSectionHeader } from '@/components/headers/TabSectionHeader'
import { typography } from '@/constants/typography'
import movesData from '../../../../services/data/moves.json'
interface MoveDetail {
  ename: string
  type: string
}

const movesMap = new Map<string, MoveDetail>(movesData.map((move: MoveDetail) => [formatMoveName(move.ename), move]))

export const Moves = () => {
  const { name } = useLocalSearchParams<{ name: string }>()
  const { moves } = usePokemonData(name)

  return (
    <>
      <TabSectionHeader title={typography.tabs.moves} />
      <MovesList moves={moves || []} movesMap={movesMap} />
    </>
  )
}
