import { CustomText } from '@/components/typography/customText'
import { View } from 'react-native'

export const PokemonsNoResults = () => {
  return (
    <View>
      <CustomText>Oops... nothing was found.</CustomText>
    </View>
  )
}
