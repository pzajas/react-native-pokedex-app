import { TouchableOpacity, ViewStyle } from 'react-native'

import { Feather } from '@expo/vector-icons'

import palette from '@/constants/palette'

interface IconButtonProps {
  name: 'search' | 'x' | 'chevron-left' | 'heart' | 'home' | 'list' | 'user' | 'square' | 'filter'
  size?: number
  color?: string
  onPress?: () => void
}

const getMarginStyle = (name: string): ViewStyle => ({
  marginLeft: name === 'search' ? 8 : name === 'filter' ? 14 : 0,
  marginRight: name === 'x' ? 8 : name === 'filter' ? 14 : 0
})

export const IconButton = ({ name, size = 24, color = palette.colors.grey.medium, onPress }: IconButtonProps) => {
  const marginStyle = getMarginStyle(name)

  return (
    <TouchableOpacity onPress={onPress} style={marginStyle}>
      <Feather name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}
