import { ThemedText } from '@/components/typography/ThemedText';
import { View } from 'react-native';

import SearchInput from './components/SearchInput';

interface SearchSectionProps {
  value: string;
  onChangeText: (text: string) => void;
}

export const SearchSection = ({ value, onChangeText }: SearchSectionProps) => {
  return (
    <View>
      <ThemedText size="large" weight="bold" className="px-4 pt-3 pb-2">
        Search Pokemon
      </ThemedText>
      <View className="px-4 pt-3 pb-2">
        <SearchInput value={value} onChangeText={onChangeText} />
      </View>
    </View>
  );
};
