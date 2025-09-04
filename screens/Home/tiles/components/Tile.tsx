import { ThemedText } from '@/components/typography/ThemedText';
import { GestureResponderEvent, Pressable, View } from 'react-native';

interface TileProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Tile = ({ label, onPress }: TileProps) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      className="w-[48.5%] h-[90px] items-center justify-center bg-surfaceTertiary dark:bg-surfaceTertiary-dark"
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
    >
      <ThemedText weight="medium" className="text-[16px]">
        {label}
      </ThemedText>
    </Container>
  );
};
