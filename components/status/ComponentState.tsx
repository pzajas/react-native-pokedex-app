import { LoadingIndicator } from '@/components/indicators/LoadingIndicator'
import { CustomText } from '@/components/typography/customText'
import { StyleSheet, View } from 'react-native'

interface IStatusComponent {
  isLoading: boolean
  isError: boolean
}

export const ComponentState = ({ isLoading, isError }: IStatusComponent) => {
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <LoadingIndicator />
      </View>
    )
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <CustomText>Error loading data</CustomText>
      </View>
    )
  }

  return null
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
