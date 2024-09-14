import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
interface ILoadingIndicator {
  size?: 'small' | 'large'
  color?: string
  message?: string
}

export const LoadingIndicator = ({ size = 'large', color = '#6200ee', message = 'Loading...' }: ILoadingIndicator) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} style={styles.spinner} />
      {message && <Text style={styles.text}>{message}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinner: {
    marginBottom: 20
  },
  text: {
    fontSize: 18
  }
})
