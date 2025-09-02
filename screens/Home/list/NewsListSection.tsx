import { ThemedText } from '@/components/typography/ThemedText';
import { useMemo } from 'react';
import { FlatList, View } from 'react-native';
import { NewsItem } from './components/NewsItem';

export const NewsListSection = () => {
  const data = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.toString()}
      scrollEnabled={false}
      ListHeaderComponent={() => (
        <ThemedText size="large" weight="bold" className="px-4 pt-2 pb-2">
          Pokemon News
        </ThemedText>
      )}
      renderItem={() => <NewsItem />}
      ListFooterComponent={() => <View className="pb-2" />}
    />
  );
};
