import { CustomText } from '@/components/typography/customText'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { StyleSheet, View } from 'react-native'
interface InformationProps {
  height: string
  weight: string
  genera?: string[]
  abilities?: string[]
}

export const Information = () => {
  const { name } = useLocalSearchParams()
  const { pokemon, species } = usePokemonData(name)

  const { weight, height, abilities } = pokemon ?? {}
  const { genera } = species ?? {}

  const getFirstWord = (text: string): string => {
    return text.split(' ')[0]
  }

  const firstWords = genera?.map(getFirstWord)

  return (
    <View style={styles.title}>
      <CustomText weight="semibold" style={styles.title}>
        Information
      </CustomText>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Species: </CustomText>
          <CustomText style={[styles.value, styles.marginRight]}>{firstWords?.join(', ')}</CustomText>
        </View>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Ability: </CustomText>
          <CustomText style={styles.value}>{(abilities && capitalize(abilities[0])) || 'N/A'}</CustomText>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Height: </CustomText>
          <CustomText style={[styles.value, styles.marginRight]}>{height / 10}m</CustomText>
        </View>
        <View style={styles.flexItem}>
          <CustomText style={styles.label}>Weight: </CustomText>
          <CustomText style={styles.value}>{weight / 10}kg</CustomText>
        </View>
      </View>
    </View>
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
