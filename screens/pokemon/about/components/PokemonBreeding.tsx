// Breeding.tsx
import { GenderIcon } from '@/assets/icons/GenderIcon'
import { GenderBalanceBar } from '@/components/bars/GenderBalanceBar'
import { CustomText } from '@/components/typography/customText'
import { StyleSheet, View } from 'react-native'

interface BreedingProps {
  malePercentage: number
  femalePercentage: number
}

export const Breeding = ({ malePercentage, femalePercentage }: BreedingProps) => {
  return (
    <>
      <CustomText weight="semibold" style={{ marginBottom: 10 }}>
        Breeding
      </CustomText>
      <View style={styles.row}>
        <GenderIcon gender="male" />
        <CustomText style={[styles.info, { fontSize: 12 }]}>Gender</CustomText>
        <GenderIcon gender="female" />
      </View>
      <GenderBalanceBar malePercentage={malePercentage} femalePercentage={femalePercentage} />
    </>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  info: {
    fontSize: 16
  }
})
