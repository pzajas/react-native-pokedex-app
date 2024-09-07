import EditScreenInfo from '@/components/EditScreenInfo'
import { Text, View } from '@/components/Themed'
import { fetchPokemonData } from '@/services/api/fetchPokemons'
import { logoutUser } from '@/services/firebase/firebaseFunctions'
import { useRouter } from 'expo-router'
import React from 'react'
import { Button, StyleSheet } from 'react-native'

export default function TabTwoScreen() {
  const router = useRouter()
  const handleLogout = async () => {
    await logoutUser()
    router.replace('/(auth)/')
  }

  const handleFetchData = async () => {
    await fetchPokemonData()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
      <Button title="Log Out" onPress={handleLogout} color="#007bff" />
      <Button title="FETCH DATA" onPress={handleFetchData} color="red" />
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
