import { CustomText } from '@/components/typography/customText'
import { StyleSheet, View } from 'react-native'

export const PokemonsHeader = () => {
  return (
    <View>
      <CustomText style={styles.text}>Pokedex</CustomText>
      <CustomText>
        Here is the Pokedex. You can search the poke you want to see, just provide its name or id number.
      </CustomText>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20
  }
})
