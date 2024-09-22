import { CustomText } from '@/components/typography/customText'
import palette from '@/constants/palette'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'
import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export const Header = () => {
  const navigateBack = useNavigateBack()

  const params = useLocalSearchParams()
  const { backgroundColor, name } = params

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor: backgroundColor
        }}
      >
        <IconButton name={'chevron-left'} size={32} color={palette.colors.white} onPress={navigateBack} />
        <CustomText style={styles.text}>{capitalize(name)}</CustomText>
        <IconButton name={'cards-heart-outline'} size={28} color={palette.colors.white} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: palette.colors.white
  }
})
