import { useClientOnlyValue } from '@/components/useClientOnlyValue'
import palette from '@/constants/palette'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { Tabs, useRouter } from 'expo-router'
import { Platform, Pressable } from 'react-native'

export default function TabLayout() {
  const router = useRouter()
  const android = Platform.OS === 'android'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: palette.colors.red.medium,
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: android ? 70 : 80,
          paddingBottom: 10
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconButton name={'square'} color={color} onPress={() => router.push('/(tabs)/')} />
          )
        }}
      />
      <Tabs.Screen
        name="poke"
        options={{
          title: 'Pokedex',
          headerStyle: {
            backgroundColor: 'crimson'
          },
          headerTintColor: 'white',
          tabBarIcon: ({ color }) => (
            <IconButton name={'list'} color={color} onPress={() => router.push('/(tabs)/poke')} />
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back()
              }}
              style={{ marginLeft: 15 }}
            >
              <MaterialIcons name="arrow-back" size={24} color="white" />
            </Pressable>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconButton name={'user'} color={color} onPress={() => router.push('/(tabs)/profile')} />
          )
        }}
      />
    </Tabs>
  )
}
