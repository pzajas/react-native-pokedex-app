import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'
interface InfoSectionProps {
  title: string
  children: React.ReactNode
}

export const InfoSection = ({ title, children }: InfoSectionProps) => (
  <View style={styles.container}>
    <CustomText weight="semibold" style={styles.title}>
      {title}
    </CustomText>
    {children}
  </View>
)

const styles = StyleSheet.create({
  container: {
    marginBottom: 10
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: typography.poppinsSemiBold
  }
})
