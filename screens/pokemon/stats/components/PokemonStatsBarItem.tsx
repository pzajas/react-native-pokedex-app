import { CustomText } from '@/components/typography/customText'
import { StyleSheet, View } from 'react-native'
import { PokemonStatsBar } from './PokemonStatsBar'
interface StatProps {
  label: string
  value: number
  maxValue: number
  backgroundColor: string
  min: number
  max: number
}

export const PokemonStatsBarItem = ({ label, value, maxValue, min, max, backgroundColor }: StatProps) => {
  return (
    <View style={styles.statItem}>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <CustomText style={styles.statLabel}>{label}</CustomText>
          <CustomText style={styles.statValue}>{value}</CustomText>
        </View>

        {label !== 'Total' && (
          <>
            <PokemonStatsBar value={value} maxValue={maxValue} backgroundColor={backgroundColor} />
            <View style={styles.rangeContainer}>
              <CustomText style={styles.statValue}>{min}</CustomText>
              <CustomText style={styles.statValue}>{max}</CustomText>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  statItem: {
    marginBottom: 10
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 110,
    alignItems: 'center'
  },
  statLabel: {
    fontSize: 16,
    color: 'gray'
  },
  statValue: {
    fontSize: 14
  },
  rangeContainer: {
    flexDirection: 'row',
    width: 60,
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  }
})
