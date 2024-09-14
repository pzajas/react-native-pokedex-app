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

// import { useLocalSearchParams } from 'expo-router'
// import { FlatList, Image, StyleSheet, View } from 'react-native'

// import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
// import { CustomText } from '@/components/typography/customText'
// import { usePokemonData } from '@/services/hooks/usePokemonData'
// import { formatMoveName } from '@/utils/formatters/formatMoveName'
// import { getIconSource } from '@/utils/icons/getMoveIconSource'

// import { capitalize } from 'lodash'

// import palette from '@/constants/palette'
// import movesData from '../../../../services/data/moves.json'
// interface MoveDetail {
//   ename: string
//   type: string
// }

// const movesMap = new Map<string, MoveDetail>(movesData.map((move: MoveDetail) => [formatMoveName(move.ename), move]))

// export const Moves = () => {
//   const { name } = useLocalSearchParams<{ name: string }>()
//   const { pokemon } = usePokemonData(name)
//   const { moves } = pokemon ?? {}

//   const renderMove = ({ item }: { item: string }) => {
//     const normalizedMove = formatMoveName(item)
//     const moveDetail = movesMap.get(normalizedMove)

//     const iconSource = moveDetail ? getIconSource(moveDetail.type) : getIconSource('normal')

//     return (
//       <View style={styles.moveItem}>
//         {moveDetail && (
//           <>
//             <View style={styles.textContainer}>
//               <CustomText style={styles.moveText}>{capitalize(moveDetail.ename.replace(/-/g, ' '))}</CustomText>
//               <CustomText style={styles.moveTypeText}>{moveDetail.type}</CustomText>
//             </View>
//             {iconSource ? (
//               <Image
//                 source={iconSource}
//                 style={styles.icon}
//                 accessibilityLabel={moveDetail ? moveDetail.ename : 'Default move icon'}
//               />
//             ) : (
//               <LoadingIndicator size="small" />
//             )}
//           </>
//         )}
//       </View>
//     )
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={moves}
//         renderItem={renderMove}
//         keyExtractor={(item) => item}
//         ListEmptyComponent={() => <LoadingIndicator />}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   moveItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(180, 180, 180, 0.05)'
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     marginRight: 10
//   },
//   textContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     flex: 1
//   },
//   moveText: {
//     fontSize: 16,
//     flex: 1
//   },
//   moveTypeText: {
//     fontSize: 16,
//     marginRight: 20,
//     color: palette.colors.grey.light
//   }
// })
