import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'

export const PokemonsHeader = () => {
  const pokedex = 'Pokedex'
  const pokedexDescription =
    'Here is the Pokedex. You can search the poke you want to see, just provide its name or id.'
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>{pokedex}</CustomText>
      <CustomText>{pokedexDescription}</CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  text: {
    fontSize: 20
  }
})
