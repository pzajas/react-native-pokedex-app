import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { NewsListSection } from './list/NewsListSection';
import { SearchSection } from './search/SearchSection';
import { TilesSection } from './tiles/TilesSection';

export const HomeScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const bottomInset = Platform.OS === 'ios' ? tabBarHeight : 0;
  const [query, setQuery] = useState('');

  return (
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomInset }}
        showsVerticalScrollIndicator={false}
      >
        <SearchSection value={query} onChangeText={setQuery} />
        <TilesSection />
        <NewsListSection />
      </ScrollView>
    </View>
  );
};
