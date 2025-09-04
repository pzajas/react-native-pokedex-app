import { ThemedText } from '@/components/typography/ThemedText';
import { useRouter, type Href } from 'expo-router';
import { View } from 'react-native';
import { Tile } from './components/Tile';

const tiles = ['Pokedex', 'Characters', 'Locations', 'Items', 'Moves', 'Abilities'] as const;

export const TilesSection = () => {
  const router = useRouter();

  return (
    <View>
      <ThemedText size="large" weight="bold" className="px-4 pt-3 pb-2">
        Explore Pokemon
      </ThemedText>
      <View className="flex-row flex-wrap gap-y-3 justify-between px-4 pt-3 pb-2">
        {tiles.map((label) => (
          <Tile
            key={label}
            label={label}
            onPress={label === 'Pokedex' ? () => router.push('/pokedex' as Href) : undefined}
          />
        ))}
      </View>
    </View>
  );
};
