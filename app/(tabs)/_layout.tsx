import { AppHeader } from '@/components/headers/AppHeader';
import { Colors } from '@/constants/color';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HeaderBackButton } from '@react-navigation/elements';
import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerLeft: (props) =>
          navigation.canGoBack() ? (
            <HeaderBackButton {...props} onPress={() => navigation.goBack()} />
          ) : undefined,
        headerTitleAlign: 'left',
        headerShadowVisible: false,
        headerTintColor: Colors[colorScheme ?? 'light'].text,
        headerStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: '700',
          color: Colors[colorScheme ?? 'light'].text,
        },
        header: ({ options }) => (
          <AppHeader
            title={(options?.title as string) || ''}
            showBackButton={navigation.canGoBack()}
            onPressBack={() => navigation.goBack()}
          />
        ),
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
        }}
      />
    </Tabs>
  );
}
