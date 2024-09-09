import { Text as DefaultText, TextProps } from 'react-native'

interface CustomTextProps extends TextProps {
  weight?: 'light' | 'regular' | 'medium' | 'bold'
}

export const CustomText: React.FC<CustomTextProps> = ({ style, weight = 'medium', ...props }) => {
  const getFontFamily = () => {
    switch (weight) {
      case 'light':
        return 'PoppinsLight'
      case 'medium':
        return 'PoppinsMedium'
      case 'bold':
        return 'PoppinsBold'
      default:
        return 'PoppinsRegular'
    }
  }

  return <DefaultText {...props} style={[{ fontFamily: getFontFamily() }, style]} />
}
