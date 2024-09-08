import { Text, View } from '@/components/Themed'
import { queryClient } from '@/services/tanstack/queryClient'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
interface PokemonResult {
  name: string
  url: string
}
interface PokemonData {
  count: number
  next: string | null
  previous: string | null
  results: PokemonResult[]
}

export default function TabOneScreen() {
  const router = useRouter()
  const { data: pokemonData, isFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData>(['pokemonData']),
    staleTime: Infinity
  })

  const handlePress = (item: any) => {
    router.push({
      pathname: `/(pages)/pokemon/${item.name}` as `/(pages)/pokemon/[id]`,
      params: item?.name
    })
  }

  const renderItem = ({ item }: { item: any }) => (
    <>
      {isFetched ? (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText} onPress={() => handlePress(item)}>
            {item?.name}
          </Text>
        </View>
      ) : (
        <ActivityIndicator />
      )}
    </>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList data={pokemonData?.results} renderItem={renderItem} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  itemText: {
    fontSize: 18,
    color: 'red'
  }
})
