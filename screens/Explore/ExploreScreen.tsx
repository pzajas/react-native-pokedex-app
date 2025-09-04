import { ThemedText } from '@/components/typography/ThemedText';
import { View } from 'react-native';

export const ExploreScreen = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ThemedText weight="bold" className="text-[20px]" color="text">
        Explore
      </ThemedText>
    </View>
  );
};
