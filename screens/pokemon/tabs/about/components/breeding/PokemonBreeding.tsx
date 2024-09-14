import { StyleSheet, View } from 'react-native'

import { GenderIcon } from '@/assets/icons/GenderIcon'
import { GenderBalanceBar } from '@/components/bars/GenderBalanceBar'
import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'

interface BreedingProps {
  malePercentage: number
  femalePercentage: number
}

export const Breeding = ({ malePercentage, femalePercentage }: BreedingProps) => {
  return (
    <View style={styles.title}>
      <CustomText weight="semibold" style={styles.title}>
        {typography.breeding}
      </CustomText>
      <View style={styles.row}>
        <GenderIcon gender="male" />
        <CustomText style={[styles.info, styles.text]}>{typography.gender}</CustomText>
        <GenderIcon gender="female" />
      </View>
      <GenderBalanceBar malePercentage={malePercentage} femalePercentage={femalePercentage} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 12
  },
  info: {
    fontSize: 16
  },
  title: {
    marginBottom: 10
  }
})
