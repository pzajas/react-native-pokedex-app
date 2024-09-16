import { TouchableOpacity, ViewStyle } from 'react-native'

import { Feather } from '@expo/vector-icons'

import palette from '@/constants/palette'

interface IconButtonProps {
  name: 'search' | 'x' | 'chevron-left' | 'heart' | 'home' | 'list' | 'user' | 'square'
  size?: number
  color?: string
  onPress?: () => void
}

export const IconButton = ({ name, size = 24, color = palette.colors.grey.medium, onPress }: IconButtonProps) => {
  const marginStyle: ViewStyle = {
    marginLeft: name === 'search' ? 8 : 0,
    marginRight: name === 'x' ? 8 : 0
  }

  return (
    <TouchableOpacity onPress={onPress} style={marginStyle}>
      <Feather name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}
