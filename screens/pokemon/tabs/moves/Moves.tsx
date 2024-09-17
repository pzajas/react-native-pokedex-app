import { useLocalSearchParams } from 'expo-router'

import { typography } from '@/constants/typography'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { formatMoveName } from '@/utils/formatters/formatMoveName'

import { PokeTabSectionHeader } from '../PokeTabSectionHeader'
import { MovesList } from './components/MovesList'

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
      <PokeTabSectionHeader title={typography.tabs.moves} />
      <MovesList moves={moves || []} movesMap={movesMap} />
    </>
  )
}
