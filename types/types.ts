import { Colors } from '@/constants/color';
import { TextProps } from 'react-native';

export type ThemedTextSize = 'small' | 'medium' | 'large';
export type ThemedTextWeight = 'regular' | 'medium' | 'bold';
export type ThemedTextColorName = keyof typeof Colors.light & keyof typeof Colors.dark;

export interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  onPressBack?: () => void;
}

export interface ThemedTextProps extends Omit<TextProps, 'style' | 'children'> {
  children: React.ReactNode;
  size?: ThemedTextSize;
  weight?: ThemedTextWeight;
  color?: ThemedTextColorName;
  fontFamily?: string;
  className?: string;
}
