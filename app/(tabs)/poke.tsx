import { PokemoneCard } from '@/components/cards/pokemonCard'
import { Text, View } from '@/components/Themed'
import { queryClient } from '@/services/tanstack/queryClient'
import { PokemonData } from '@/typescript/types/pokemonTypes'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'expo-router'
import { ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native'
interface PokemonStats {
  attack: number
  defense: number
  hp: number
  'special-attack': number
  'special-defense': number
  speed: number
}

export default function PokeScreen() {
  const router = useRouter()
  const { data: pokemonData, isFetched: pokemonsFetched } = useQuery({
    queryKey: ['pokemonData'],
    queryFn: () => queryClient.getQueryData<PokemonData[]>(['pokemonData']),
    staleTime: Infinity
  })

  const handleNavigatePokemon = (item: any) => {
    router.push({
      pathname: `/(pages)/pokemon/${item.name}` as `/(pages)/pokemon/[id]`,
      params: item?.name
    })
  }

  const renderItem = ({ item }: { item: PokemonData }) => {
    return (
      <>
        {pokemonsFetched ? (
          <View style={styles.itemContainer}>
            <PokemoneCard item={item} handleNavigatePokemon={handleNavigatePokemon} />
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Text>Pokedex</Text>
      <TextInput
        style={{
          borderWidth: 1,
          borderColor: 'black',
          height: 50,
          marginHorizontal: 8,
          borderRadius: 8
        }}
        placeholder="Type a pokemon name..."
      />
      <FlatList data={pokemonData} renderItem={renderItem} keyExtractor={(item) => String(item.id)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    padding: 10
  },
  itemText: {
    fontSize: 18
  },
  itemId: {
    fontSize: 16,
    color: '#555'
  },
  itemType: {
    fontSize: 16,
    color: '#888'
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
})
