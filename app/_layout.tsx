import { AppHeader } from '@/components/headers/AppHeader';
import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(content)/pokedex/index"
          options={{
            title: 'Pokedex',
            headerTitleAlign: 'left',
            headerShadowVisible: false,
            headerTintColor: Colors[colorScheme ?? 'light'].text,
            headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
            headerTitleStyle: {
              fontSize: 22,
              fontWeight: '700',
              color: Colors[colorScheme ?? 'light'].text,
            },
            header: ({ options, navigation }) => (
              <AppHeader
                title={(options?.title as string) || ''}
                showBackButton={navigation.canGoBack()}
                onPressBack={() => navigation.goBack()}
              />
            ),
            animation: 'slide_from_right',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
