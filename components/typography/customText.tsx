import { Text as DefaultText, TextProps } from 'react-native'

interface CustomTextProps extends TextProps {
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold'
}

export const CustomText: React.FC<CustomTextProps> = ({ style, weight = 'medium', ...props }) => {
  const getFontFamily = () => {
    switch (weight) {
      case 'light':
        return 'PoppinsLight'
      case 'medium':
        return 'PoppinsMedium'
      case 'semibold':
        return 'PoppinsSemiBold'
      case 'bold':
        return 'PoppinsBold'
      default:
        return 'PoppinsRegular'
    }
  }

  return <DefaultText {...props} style={[{ fontFamily: getFontFamily() }, style]} />
}
