import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { usePokemonData } from '@/services/hooks/usePokemonData'
import { formatMoveName } from '@/utils/formatters/formatMoveName'

import { MovesList } from './components/MovesList'

import movesData from '../../../../services/data/moves.json'
interface MoveDetail {
  ename: string
  type: string
}

const movesMap = new Map<string, MoveDetail>(movesData.map((move: MoveDetail) => [formatMoveName(move.ename), move]))

export const Moves: React.FC = () => {
  const { name } = useLocalSearchParams<{ name: string }>()
  const { pokemon } = usePokemonData(name)
  const { moves } = pokemon ?? {}

  return (
    <View style={styles.container}>
      <MovesList moves={moves || []} movesMap={movesMap} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
