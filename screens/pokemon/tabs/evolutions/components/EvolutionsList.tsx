// EvolutionsList.tsx
import { useLocalSearchParams } from 'expo-router'
import { FlatList, StyleSheet, View } from 'react-native'

import { EvolutionsItem } from './EvolutionItem'

interface EvolutionsListProps {
  evolutionList: { name: string; id: number }[]
}

export const EvolutionsList: React.FC<EvolutionsListProps> = ({ evolutionList }) => {
  const { name }: { name: string } = useLocalSearchParams()
  const numColumns = 2

  return (
    <View style={styles.container}>
      <FlatList
        data={evolutionList}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <EvolutionsItem item={item} name={name} />}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10
  }
})
