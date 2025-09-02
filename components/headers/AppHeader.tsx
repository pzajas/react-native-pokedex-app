import { ThemedText } from '@/components/typography/ThemedText';
import { AppHeaderProps } from '@/types/types';
import { HeaderBackButton } from '@react-navigation/elements';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const AppHeader = ({ title, showBackButton, onPressBack }: AppHeaderProps) => {
  return (
    <SafeAreaView edges={['top']} className="bg-surfacePrimary dark:bg-surfacePrimary-dark">
      <View className="h-[56px] flex-row items-center px-2">
        {showBackButton ? (
          <HeaderBackButton onPress={onPressBack} />
        ) : (
          <View className="w-[44px] h-[44px] justify-center items-center" />
        )}
        <ThemedText weight="bold" className="flex-1 text-[22px] text-left px-2" numberOfLines={1}>
          {title}
        </ThemedText>
        <View className="w-[44px]" />
      </View>
    </SafeAreaView>
  );
};
