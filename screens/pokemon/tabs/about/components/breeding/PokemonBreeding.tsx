import { StyleSheet, View } from 'react-native'

import { GenderIcon } from '@/assets/icons/GenderIcon'
import { CustomText } from '@/components/typography/customText'
import { typography } from '@/constants/typography'
import { PokeTabSectionHeader } from '@/screens/pokemon/tabs/PokeTabSectionHeader'

import { GenderBalanceBar } from './GenderBalanceBar'
interface BreedingProps {
  malePercentage: number
  femalePercentage: number
}

export const Breeding = ({ malePercentage, femalePercentage }: BreedingProps) => {
  const male = 'male'
  const female = 'female'

  return (
    <View style={styles.title}>
      <PokeTabSectionHeader title={typography.tabs.breeding} />
      <View style={styles.row}>
        <GenderIcon gender={male} />
        <CustomText style={[styles.info, styles.text]}>{malePercentage}</CustomText>

        <CustomText style={[styles.info, styles.text]}>{typography.tabs.gender}</CustomText>
        <CustomText style={[styles.info, styles.text]}>{femalePercentage}</CustomText>

        <GenderIcon gender={female} />
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
    fontSize: 14
  },
  info: {
    fontSize: 14
  },
  title: {
    marginBottom: 10
  }
})
