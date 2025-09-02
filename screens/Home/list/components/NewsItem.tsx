import { ThemedText } from '@/components/typography/ThemedText';
import { View } from 'react-native';
export const NewsItem = () => {
  return (
    <View className="flex-row gap-3 items-center px-4 py-2">
      <View className="w-[72px] h-[72px] bg-surfaceTertiary dark:bg-surfaceTertiary-dark" />
      <View className="flex-1 min-h-[72px] justify-between">
        <View className="gap-0">
          <ThemedText weight="bold" className="text-[16px]">
            Pokémon Rumble Rush
          </ThemedText>
          <ThemedText weight="bold" className="text-[16px]">
            Arrives Soon
          </ThemedText>
        </View>
        <ThemedText weight="medium" className="text-[13px]" color="icon">
          15 May 2019
        </ThemedText>
      </View>
    </View>
  );
};
