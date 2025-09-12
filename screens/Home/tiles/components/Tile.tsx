import { ThemedText } from '@/components/typography/ThemedText';
import { GestureResponderEvent, Image, Pressable, View } from 'react-native';

interface TileProps {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
}

export const Tile = ({ label, onPress }: TileProps) => {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      className="w-[48.5%] h-[90px] items-center justify-center bg-surfaceTertiary dark:bg-surfaceTertiary-dark rounded-xl overflow-hidden"
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
    >
      <Image
        source={require('../../../../assets/images/pokeball.png')}
        style={{
          position: 'absolute',
          right: -12,
          top: -12,
          width: 100,
          height: 100,
          opacity: 0.05,
        }}
        resizeMode="contain"
      />
      <ThemedText weight="medium" className="text-[16px]">
        {label}
      </ThemedText>
    </Container>
  );
};
