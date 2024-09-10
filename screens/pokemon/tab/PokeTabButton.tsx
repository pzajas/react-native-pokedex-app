import { TouchableOpacity, StyleSheet } from 'react-native'
import { CustomText } from '@/components/typography/customText'

interface TabButtonProps {
  label: string
  isActive: boolean
  onPress: () => void
}

export const PokeTabButton = ({ label, isActive, onPress }: TabButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.tabButton, isActive && styles.activeTab]}>
      <CustomText style={[styles.tabText, isActive && styles.activeTabText]}>{label}</CustomText>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent'
  },
  activeTab: {
    borderBottomColor: '#007bff'
  },
  tabText: {
    color: '#666'
  },
  activeTabText: {
    color: '#000',
    fontFamily: 'PoppinsSemiBold'
  }
})
