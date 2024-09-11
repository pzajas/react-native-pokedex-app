import { CustomText } from '@/components/typography/customText'
import { formatMoveName } from '@/utils/formatters/formatMoveName'
import { moveImages } from '@/utils/images/typeImageUrls'
import { useQuery } from '@tanstack/react-query'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import movesData from '../../../services/data/moves.json'

interface IMove {
  accuracy: number
  category: string
  cname: string
  ename: string
  id: number
  jname: string
  power: number
  pp: number
  type: string
}

const fetchFilteredMoves = async (currentPokemon: any) => {
  if (!currentPokemon || !currentPokemon.moves) return []
  const moveNames = currentPokemon.moves.map((item: any) => item.move.name)
  const filteredMovesData = movesData?.filter((move: any) => moveNames.includes(formatMoveName(move.ename)))
  return filteredMovesData || []
}

export const Moves = ({ currentPokemon }: any) => {
  const {
    data: filteredMoves = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['filteredMoves', currentPokemon],
    queryFn: () => fetchFilteredMoves(currentPokemon),
    enabled: !!currentPokemon
  })

  const renderMove = ({ item }: { item: any }) => {
    const image = moveImages[item.type] || moveImages['Normal']

    return (
      <View style={styles.moveItem}>
        <CustomText style={styles.moveText}>{item.ename}</CustomText>
        <CustomText style={styles.moveTypeText}>{item.type}</CustomText>
        <Image source={image} style={{ width: 30, height: 30 }} />
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <CustomText>Loading...</CustomText>
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.loadingContainer}>
        <CustomText>Error fetching moves</CustomText>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={filteredMoves} renderItem={renderMove} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 250
  },
  moveItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moveText: {
    fontSize: 16,
    width: 200
  },
  moveTypeText: {
    fontSize: 16,
    color: '#555'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
