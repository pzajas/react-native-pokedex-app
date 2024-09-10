import { IconButton } from '@/components/buttons/IconButton'
import { CustomText } from '@/components/typography/customText'
import { useRouter } from 'expo-router'
import { capitalize } from 'lodash'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export const Header = ({ currentPokemon }: any) => {
  const router = useRouter()

  const navigateBack = () => {
    router.back()
  }
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16
        }}
      >
        <IconButton name={'left'} press={navigateBack} />
        <CustomText style={{ fontSize: 20, color: 'white' }}>{capitalize(currentPokemon?.name)}</CustomText>
        <IconButton name={'hearto'} press={() => console.log('favo')} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
