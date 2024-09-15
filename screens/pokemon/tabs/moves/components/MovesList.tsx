import { FlatList } from 'react-native'

import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { formatMoveName } from '@/utils/formatters/formatMoveName'

import { MoveItem } from './MoveItem'
interface MoveDetail {
  ename: string
  type: string
}
interface MovesListProps {
  moves: string[]
  movesMap: Map<string, MoveDetail>
}

export const MovesList: React.FC<MovesListProps> = ({ moves, movesMap }) => {
  const renderMove = ({ item }: { item: string }) => {
    const normalizedMove = formatMoveName(item)
    const moveDetail = movesMap.get(normalizedMove)

    return <MoveItem moveDetail={moveDetail} />
  }

  return (
    <FlatList
      data={moves}
      renderItem={renderMove}
      keyExtractor={(item) => item}
      ListEmptyComponent={() => <LoadingIndicator />}
    />
  )
}
