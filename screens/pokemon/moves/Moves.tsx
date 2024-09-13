import { CustomText } from '@/components/typography/customText'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { pokemonTypeIcons } from '@/utils/icons/pokemonTypeIcons'
import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from 'react-native'
import movesData from '../../../services/data/moves.json'

const normalizeMoveName = (name: string) => {
  return name
    .replace(/-/g, ' ') // Replace hyphens with spaces
    .toLowerCase() // Convert to lowercase
    .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize first letter of each word
}

const movesMap = new Map<string, MoveDetail>(movesData.map((move: MoveDetail) => [normalizeMoveName(move.ename), move]))

export const Moves = () => {
  const { name } = useLocalSearchParams()
  const { pokemon, isLoading } = usePokemonData(name)
  const { moves } = pokemon ?? []

  const renderMove = ({ item }: { item: string }) => {
    const normalizedMove = normalizeMoveName(item)
    const moveDetail = movesMap.get(normalizedMove)

    // Determine the move type for the icon
    const iconSource = moveDetail
      ? pokemonTypeIcons[moveDetail.type.toLowerCase()] || pokemonTypeIcons.default
      : pokemonTypeIcons.default

    return (
      <View style={styles.moveItem}>
        {moveDetail && (
          <>
            <View style={styles.textContainer}>
              <CustomText style={styles.moveText}>{capitalize(moveDetail.ename.replace(/-/g, ' '))}</CustomText>
              <CustomText style={styles.moveTypeText}>{moveDetail.type}</CustomText>
            </View>
            {iconSource ? (
              <Image source={iconSource} style={styles.icon} />
            ) : (
              <ActivityIndicator size="small" color="#0000ff" style={styles.icon} />
            )}
          </>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={moves}
        renderItem={renderMove}
        keyExtractor={(item) => item}
        ListEmptyComponent={() => <ActivityIndicator size="large" color="#0000ff" />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  moveItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(180, 180, 180, 0.05)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moveText: {
    fontSize: 16,
    flex: 1
  },
  moveTypeText: {
    fontSize: 16,
    marginRight: 20,
    color: '#555'
  }
})
