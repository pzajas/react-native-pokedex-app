import { ThemedText } from '@/components/typography/ThemedText';
import { View } from 'react-native';

export const PokedexScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <ThemedText weight="bold" className="text-[18px]" color="text">
        Pokedex Screen
      </ThemedText>
    </View>
  );
};
