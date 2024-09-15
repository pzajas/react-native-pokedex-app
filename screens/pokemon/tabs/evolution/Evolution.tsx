import { CustomText } from '@/components/typography/customText'
import constants from '@/constants/constants'
import { usePokemonData } from '@/services/hooks/usePokemonData'

import { useLocalSearchParams, useRouter } from 'expo-router'
import { capitalize } from 'lodash'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'

const extractEvolutions = (chain: any): { name: string; id: number; evolutionDetails?: any }[] => {
  let evolutions: { name: string; id: number; evolutionDetails?: any }[] = []

  const traverseChain = (currentChain: any) => {
    if (currentChain && currentChain.species) {
      const idMatch = /\/(\d+)\//.exec(currentChain.species.url)
      const id = idMatch ? parseInt(idMatch[1], 10) : null

      const evolutionDetails = currentChain.evolution_details ? currentChain.evolution_details[0] : {}

      evolutions.push({
        name: currentChain.species.name,
        id: id,
        evolutionDetails: evolutionDetails
      })

      currentChain.evolves_to.forEach((nextChain: any) => traverseChain(nextChain))
    }
  }

  traverseChain(chain)
  return evolutions
}

export const Evolution = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { backgroundColor } = useLocalSearchParams()
  const { evolutions, isLoading, isError } = usePokemonData(name)
  const pokemonImageUri = constants.api.ARTWORK_API_URL

  const router = useRouter()

  const handleNavigatePokemon = (item: { name: string; id: number }) => {
    router.push({
      pathname: '/pokemon/[name]',
      params: {
        name: item.name,
        id: item.id,
        backgroundColor
      }
    })
  }

  if (isLoading) return <Text>Loading...</Text>
  if (isError) return <Text>Error loading data</Text>

  const evolutionList = evolutions ? extractEvolutions(evolutions.chain) : []

  const numColumns = 2

  const renderItem = (
    item: { name: string; id: number },
    name: string,
    handleNavigatePokemon: (item: { name: string; id: number }) => void,
    pokemonImageUri: string
  ) => {
    const isCurrentPokemon = name === item.name
    return (
      <Pressable
        onPress={() => !isCurrentPokemon && handleNavigatePokemon(item)}
        style={isCurrentPokemon ? [styles.currentPokemonCard, { opacity: 0.4 }] : styles.card}
        disabled={isCurrentPokemon}
      >
        <CustomText style={styles.item}>{capitalize(item.name)}</CustomText>
        <Image source={{ uri: `${pokemonImageUri}/${item.id}.png` }} style={styles.image} />
      </Pressable>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={evolutionList}
        numColumns={numColumns}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item, name, handleNavigatePokemon, pokemonImageUri)}
        columnWrapperStyle={styles.row}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center'
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10
  },
  card: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    margin: 8,
    height: 180
  },
  currentPokemonCard: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    margin: 8,
    height: 180,
    opacity: 0.2
  },
  item: {
    fontSize: 18,
    marginBottom: 10
  },
  image: {
    width: 120,
    height: 120
  }
})
