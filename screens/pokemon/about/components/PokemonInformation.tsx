import { CustomText } from '@/components/typography/customText'
import { capitalize } from 'lodash'
import { StyleSheet, View } from 'react-native'

interface InformationProps {
  height: string
  weight: string
  pokemonCategory: string
  abilities: string
}

export const Information = ({ height, weight, pokemonCategory, abilities }: InformationProps) => {
  return (
    <>
      <CustomText weight="semibold" style={styles.title}>
        Information
      </CustomText>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Species: </CustomText>
          <CustomText style={[styles.value, styles.marginRight]}>{pokemonCategory}</CustomText>
        </View>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Ability: </CustomText>
          <CustomText style={styles.value}>{capitalize(abilities)}</CustomText>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Height: </CustomText>
          <CustomText style={[styles.value, styles.marginRight]}>{height}</CustomText>
        </View>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Weight: </CustomText>
          <CustomText style={styles.value}>{weight}</CustomText>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  flexItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  label: {
    fontSize: 16,
    color: 'grey'
  },
  value: {
    fontSize: 16,
    color: 'black'
  },
  marginRight: {
    marginRight: 50
  }
})
