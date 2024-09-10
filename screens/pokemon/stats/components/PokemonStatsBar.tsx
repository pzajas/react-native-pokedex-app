import { View } from '@/components/Themed'
import { StyleSheet } from 'react-native'

interface StatProps {
  value: number
  maxValue: number
  backgroundColor: string
}

export const PokemonStatsBar = ({ value, maxValue, backgroundColor }: StatProps) => {
  const progress = (value / maxValue) * 100

  return (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor }]} />
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5
  }
})
