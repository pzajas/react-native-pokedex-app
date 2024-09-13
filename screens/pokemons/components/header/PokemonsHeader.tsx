import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'

export const PokemonsHeader = () => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.text}>Pokedex</CustomText>
      <CustomText>
        Here is the Pokedex. You can search the poke you want to see, just provide its name or id.
      </CustomText>
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
