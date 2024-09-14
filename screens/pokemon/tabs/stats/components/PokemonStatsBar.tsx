import { StyleSheet } from 'react-native'

import { View } from '@/components/Themed'

import palette from '@/constants/palette'

interface IPokemonStatsBar {
  value: number
  maxValue: number
  backgroundColor: string
}

export const PokemonStatsBar = ({ value, maxValue, backgroundColor }: IPokemonStatsBar) => {
  const progress = (value / maxValue) * 100

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    overflow: 'hidden',
    flex: 1,
    height: 6,
    borderRadius: 5,
    backgroundColor: palette.colors.grey.light
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5
  }
})
