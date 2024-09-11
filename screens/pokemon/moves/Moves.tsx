import { CustomText } from '@/components/typography/customText'
import { moveImages } from '@/utils/images/typeImageUrls'
import { FlatList, Image, StyleSheet, View } from 'react-native'
import { ICurrentPokemon } from '../tab/PokeTabs'
interface IMove {
  accuracy: number
  category: string
  cname: string
  ename: string
  id: number
  jname: string
  power: number | null
  pp: number
  type: string
  tm?: string
  max_pp?: number

  name: string
}

export const Moves = ({ currentPokemon }: ICurrentPokemon) => {
  if (!currentPokemon) {
    return (
      <View style={styles.container}>
        <CustomText>No Pokémon selected</CustomText>
      </View>
    )
  }

  const renderMove = ({ item }: { item: IMove }) => {
    const moveIcon = moveImages[item.type] || moveImages['Normal']

    return (
      <View style={styles.moveItem}>
        <View style={styles.textContainer}>
          <CustomText style={styles.moveText}> {item.name.replace(/-/g, ' ')}</CustomText>
          <CustomText style={styles.moveTypeText}>{item.type}</CustomText>
        </View>
        <Image source={moveIcon} style={styles.icon} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={currentPokemon.moves} renderItem={renderMove} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 250
  },
  moveItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
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
    color: '#555'
  }
})
