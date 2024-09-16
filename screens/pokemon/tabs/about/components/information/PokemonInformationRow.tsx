import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'

import palette from '@/constants/palette'
interface IInfoRow {
  label: string
  value: string
  style?: object
}

export const InfoRow = ({ label, value, style }: IInfoRow) => (
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
    fontSize: 14,
    marginRight: 10,
    color: palette.colors.grey.medium
  },
  value: {
    fontSize: 14,
    color: palette.colors.black
  }
})
