import { IconButton } from '@/components/buttons/IconButton'
import { CustomText } from '@/components/typography/customText'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { capitalize } from 'lodash'
import { SafeAreaView, View } from 'react-native'

export const Header = ({ name }: any) => {
  const { backgroundColor } = useLocalSearchParams()
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
          padding: 16,
          backgroundColor: backgroundColor
        }}
      >
        <IconButton name={'left'} press={navigateBack} />
        <CustomText style={{ fontSize: 20, color: 'white' }}>{capitalize(name)}</CustomText>
        <IconButton name={'hearto'} press={() => console.log('favo')} />
      </View>
    </SafeAreaView>
  )
}
