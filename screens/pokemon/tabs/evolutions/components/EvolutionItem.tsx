import { Image, Pressable, StyleSheet } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { useNavigateEvolution } from '@/utils/navigation/useNavigateEvolution'

import { capitalize } from 'lodash'

import constants from '@/constants/constants'

interface IEvolutionsItem {
  item: { name: string; id: number }
  name: string
}

export const EvolutionsItem = ({ item, name }: IEvolutionsItem) => {
  const isCurrentPokemon = name === item.name
  const pokemonImageUri = constants.api.ARTWORK_API_URL
  const navigatePokemon = useNavigateEvolution()

  return (
    <Pressable
      onPress={() => !isCurrentPokemon && navigatePokemon(item)}
      style={isCurrentPokemon ? [styles.currentPokemonCard, { opacity: 0.4 }] : styles.card}
      disabled={isCurrentPokemon}
    >
      <CustomText style={styles.item}>{capitalize(item.name)}</CustomText>
      <Image source={{ uri: `${pokemonImageUri}/${item.id}.png` }} style={styles.image} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180
  },
  currentPokemonCard: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 180,
    opacity: 0.2
  },
  item: {
    fontSize: 14,
    marginBottom: 10
  },
  image: {
    width: 120,
    height: 120
  }
})
