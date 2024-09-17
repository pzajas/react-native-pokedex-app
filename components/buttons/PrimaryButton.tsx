import { Pressable, StyleSheet } from 'react-native'

import { CustomText } from '../typography/customText'

import palette from '@/constants/palette'

interface PrimaryButtonProps {
  title: string
  handlePress: () => void
}

export const PrimaryButton = ({ title, handlePress }: PrimaryButtonProps) => {
  return (
    <Pressable style={styles.resetButton} onPress={handlePress}>
      <CustomText style={styles.resetButtonText}>{title}</CustomText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  resetButton: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    elevation: 2,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  resetButtonText: {
    fontSize: 16,
    textAlign: 'center',
    color: palette.colors.white
  }
})
