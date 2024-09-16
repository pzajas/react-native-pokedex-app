import { StyleSheet } from 'react-native'

import palette from '@/constants/palette'
import { CustomText } from '../typography/customText'

export const TabSectionHeader = ({ title }: { title: string }) => {
  return (
    <CustomText weight="semibold" style={styles.title}>
      {title}
    </CustomText>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
    fontSize: 16,
    color: palette.colors.black
  }
})
