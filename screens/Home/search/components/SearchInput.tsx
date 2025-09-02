import { TextInput, TextInputProps } from 'react-native';

interface Props extends Omit<TextInputProps, 'style'> {
  value: string;
  onChangeText: (text: string) => void;
}

export default function SearchInput({ value, onChangeText, ...rest }: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      className="h-16 px-[14px] border border-borderPrimaryDefault dark:border-borderPrimaryDefault-dark bg-surfaceSecondary dark:bg-surfaceSecondary-dark text-textPrimary dark:text-textPrimary-dark placeholder:text-textSecondary dark:placeholder:text-textSecondary-dark"
      placeholder="Search Pokemon"
      returnKeyType="search"
      {...rest}
    />
  );
}
