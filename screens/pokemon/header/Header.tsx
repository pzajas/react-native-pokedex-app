import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView, StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'

import palette from '@/constants/palette'

export const Header = () => {
  const { backgroundColor, capitalizedName } = useLocalSearchParams()
  const navigateBack = useNavigateBack()

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor: backgroundColor as string
        }}
      >
        <IconButton name={'chevron-left'} size={32} color={palette.colors.white} onPress={navigateBack} />
        <CustomText style={styles.text}>{capitalizedName}</CustomText>
        <IconButton
          name={'favorite-border'}
          size={26}
          color={palette.colors.white}
          onPress={() => console.log('favo')}
        />
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
