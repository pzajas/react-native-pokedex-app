import { ThemedText } from '@/components/typography/ThemedText';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <View className="flex-1 justify-center items-center bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <ThemedText weight="bold" className="text-[24px]">
        {name}
      </ThemedText>
    </View>
  );
}
