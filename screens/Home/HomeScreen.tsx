import { ScrollView, View } from 'react-native';
import { NewsListSection } from './list/NewsListSection';
import { SearchSection } from './search/SearchSection';
import { TilesSection } from './tiles/TilesSection';

export const HomeScreen = () => {
  return (
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <ScrollView contentContainerClassName="pb-16" showsVerticalScrollIndicator={false}>
        <SearchSection value="" onChangeText={() => {}} />
        <TilesSection />
        <NewsListSection />
      </ScrollView>
    </View>
  );
};
