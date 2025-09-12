import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, TextInput, TextInputProps, View } from 'react-native';

interface Props extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ value, onChangeText, ...rest }: Props) {
  return (
    <View className="relative">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="h-16 px-[14px] pr-10 border border-borderPrimaryDefault dark:border-borderPrimaryDefault-dark bg-surfaceSecondary dark:bg-surfaceSecondary-dark text-textPrimary dark:text-textPrimary-dark placeholder:text-textSecondary dark:placeholder:text-textSecondary-dark"
        placeholder="Search Pokemon"
        returnKeyType="search"
        {...rest}
      />
      {value?.length ? (
        <Pressable
          onPress={() => onChangeText('')}
          accessibilityLabel="Clear search"
          hitSlop={8}
          className="absolute top-0 bottom-0 right-3 justify-center"
        >
          <Ionicons name="close" size={18} color="#9b9ea1" />
        </Pressable>
      ) : null}
    </View>
  );
}
