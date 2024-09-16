import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'

import { PokemonStatsBar } from './PokemonStatsBar'

import palette from '@/constants/palette'

interface IPokemonStatsBarItem {
  label: string
  value: number
  maxValue: number
  backgroundColor: string
  min: number
  max: number
}

export const PokemonStatsBarItem = ({ label, value, maxValue, min, max, backgroundColor }: IPokemonStatsBarItem) => {
  const totalLabel = 'Total'

  return (
    <View style={styles.statItem}>
      <View style={styles.statRow}>
        <View style={styles.labelContainer}>
          <CustomText style={styles.statLabel}>{label}</CustomText>
          <CustomText style={styles.statValue}>{value}</CustomText>
        </View>

        {label !== totalLabel && (
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
    marginBottom: 10,
    paddingVertical: 4
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
    alignItems: 'center',
    width: 110
  },
  statLabel: {
    fontSize: 14,
    color: palette.colors.grey.medium
  },
  statValue: {
    fontSize: 14
  },
  rangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 60,
    gap: 5
  }
})
