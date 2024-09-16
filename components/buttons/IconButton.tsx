import { AntDesign } from '@expo/vector-icons'
import { GestureResponderEvent, Pressable } from 'react-native'
interface IconButtonProps {
  name: keyof typeof AntDesign.glyphMap
  press: (event: GestureResponderEvent) => void
}

export const IconButton = ({ name, press }: IconButtonProps) => {
  return (
    <Pressable onPress={press} style={{ padding: 10 }}>
      <AntDesign name={name} size={24} color="white" />
    </Pressable>
  )
}
