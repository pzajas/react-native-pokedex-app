import palette from '@/constants/palette'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'

interface SmallRoundButtonProps {
  onPress: () => void
  iconName: keyof typeof MaterialIcons.glyphMap
}

export const SmallRoundButton = ({ onPress, iconName }: SmallRoundButtonProps) => {
  return (
    <TouchableOpacity style={styles.scrollToTopButton} onPress={onPress}>
      <MaterialIcons name={iconName as keyof typeof MaterialIcons.glyphMap} size={24} color={palette.light.text} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  scrollToTopButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: palette.light.textLight,
    borderRadius: 30,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5
  }
})
