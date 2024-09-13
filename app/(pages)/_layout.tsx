import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

export default function PagesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="pokemon/[name]"
        options={{
          title: 'Pokemon'
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 20
  }
})
