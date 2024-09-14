import { StyleSheet, TouchableOpacity } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons'

import palette from '@/constants/palette'
interface IconButtonProps {
  name: 'search' | 'close' | 'chevron-left' | 'favorite-border'
  size?: number
  color?: string
  onPress?: () => void
}

export const IconButton = ({ name, size = 24, color = palette.colors.grey.medium, onPress }: IconButtonProps) => {
  const marginStyle = name === 'search' ? styles.searchIcon : styles.closeIcon

  return (
    <TouchableOpacity onPress={onPress} style={marginStyle}>
      <MaterialIcons name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  searchIcon: {
    marginLeft: 8
  },
  closeIcon: {
    marginRight: 8
  }
})
