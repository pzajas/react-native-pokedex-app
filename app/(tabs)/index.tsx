import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5
  }
})
