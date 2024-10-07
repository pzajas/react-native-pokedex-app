import { capitalize } from 'lodash'
import { Image, Pressable, StyleSheet } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { IEvolutionsItem, useNavigatePokemon } from '@/utils/navigation/useNavigatePokemon'

import constants from '@/constants/constants'

export const EvolutionsItem = ({ name, item }: IEvolutionsItem) => {
  const { name: currentPokemonName, id: currentPokemonId } = item

  const isCurrentPokemon = name === item.name
  const pokemonImageUri = constants.api.ARTWORK_API_URL
  const navigatePokemon = useNavigatePokemon()

  return (
    <Pressable
      onPress={() => !isCurrentPokemon && navigatePokemon(currentPokemonName, currentPokemonId)}
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
