import { Text, View } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function PokemonScreen() {
  const { id } = useLocalSearchParams()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{id}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
