import { TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'

import palette from '@/constants/palette'
interface IconButtonProps {
  name: 'search' | 'x' | 'chevron-left' | 'heart' | 'home' | 'list' | 'user' | 'square'
  size?: number
  color?: string
  onPress?: () => void
}

export const IconButton = ({ name, size = 24, color = palette.colors.grey.medium, onPress }: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Feather name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}
