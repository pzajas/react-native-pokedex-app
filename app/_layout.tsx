import { useColorScheme } from '@/components/useColorScheme'
import { auth } from '@/services/firebase/firebase'
import { queryClient } from '@/services/tanstack/queryClient'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { PoppinsBold, PoppinsLight, PoppinsMedium, PoppinsRegular, PoppinsSemiBold } from '../assets/fonts'

SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName: '(tabs)'
}

export default function RootLayout() {
  const router = useRouter()
  const [fontsLoaded] = useFonts({
    PoppinsLight,
    PoppinsRegular,
    PoppinsMedium,
    PoppinsSemiBold,
    PoppinsBold,
    ...FontAwesome.font
  })

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true)
        setIsEmailVerified(user.emailVerified)
      } else {
        setIsLoggedIn(false)
        setIsEmailVerified(false)
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (fontsLoaded && isLoggedIn !== null) {
      SplashScreen.hideAsync()
      if (isLoggedIn) {
        router.replace(isEmailVerified ? '/(fetching)/' : '/(auth)/')
      } else {
        router.replace('/(auth)/')
      }
    }
  }, [fontsLoaded, isLoggedIn, isEmailVerified, router])

  if (!fontsLoaded || isLoggedIn === null) {
    return null
  }

  return <RootLayoutNav isLoggedIn={isLoggedIn} />
}

function RootLayoutNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const colorScheme = useColorScheme()
  const persister = createAsyncStoragePersister({
    storage: AsyncStorage
  })

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
        {isLoggedIn ? (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'(fetching)'} />
            <Stack.Screen name={'(tabs)'} />
            <Stack.Screen name={'(pages)'} />
          </Stack>
        ) : (
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'(auth)'} />
          </Stack>
        )}
      </ThemeProvider>
      <Toast />
    </PersistQueryClientProvider>
  )
}
