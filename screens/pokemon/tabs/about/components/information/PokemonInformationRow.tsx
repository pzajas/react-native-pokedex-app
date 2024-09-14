import { CustomText } from '@/components/typography/customText'
import { StyleSheet, View } from 'react-native'

interface InfoRowProps {
  label: string
  value: string
  style?: object
}

export const InfoRow = ({ label, value, style }: InfoRowProps) => (
  <View style={[styles.row, style]}>
    <CustomText style={styles.label}>{label}</CustomText>
    <CustomText style={styles.value}>{value}</CustomText>
  </View>
)

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    color: 'grey',
    marginRight: 10
  },
  value: {
    fontSize: 16,
    color: 'black'
  }
})
