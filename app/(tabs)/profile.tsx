import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { logoutUser } from '@/services/firebase/firebaseFunctions'
import { useRouter } from 'expo-router'
import { Button, StyleSheet } from 'react-native'

export default function ProfileScreen() {
  const router = useRouter()
  const handleLogout = async () => {
    await logoutUser()
    router.replace('/(auth)/')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <Button title="Log Out" onPress={handleLogout} color="#007bff" />
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
