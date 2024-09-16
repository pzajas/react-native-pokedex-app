import { AccessibilityRole, StyleSheet, TouchableOpacity } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'

import palette from '@/constants/palette'
interface TabButtonProps {
  label: string
  isActive: boolean
  accessibilityRole?: AccessibilityRole
  accessibilityState?: { selected: boolean }
  onPress: () => void
}

export const PokeTabButton = ({
  label,
  isActive,
  onPress,
  accessibilityRole = 'tab',
  accessibilityState = { selected: isActive }
}: TabButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.tabButton, isActive && styles.activeTab]}
      accessibilityRole={accessibilityRole}
      accessibilityState={accessibilityState}
    >
      <CustomText style={[styles.tabText, isActive && styles.activeTabText]}>{label}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tabButton: {
    alignItems: 'center',
    flex: 1,
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: palette.colors.transparent
  },
  activeTab: {
    borderBottomColor: palette.colors.grey.dark
  },
  tabText: {
    color: palette.colors.grey.medium
  },
  activeTabText: {
    color: palette.colors.black,
    fontFamily: typography.poppinsSemiBold
  }
})
