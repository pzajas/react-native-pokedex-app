import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'

import palette from '@/constants/palette'
interface SmallRoundButtonProps {
  onPress: () => void
  iconName: keyof typeof MaterialIcons.glyphMap
}

export const SmallRoundButton = ({ onPress, iconName }: SmallRoundButtonProps) => {
  const dynamicStyle = { right: iconName === 'add' ? 0 : 20 }

  return (
    <TouchableOpacity style={[styles.scrollToTopButton, dynamicStyle]} onPress={onPress}>
      <MaterialIcons name={iconName} size={24} color={palette.light.text} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
    backgroundColor: palette.colors.white,
    borderColor: palette.colors.black
  }
})
