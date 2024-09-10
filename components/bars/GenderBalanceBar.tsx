import palette from '@/constants/palette'
import { StyleSheet, View } from 'react-native'

export const GenderBalanceBar = ({
  malePercentage,
  femalePercentage
}: {
  malePercentage: number
  femalePercentage: number
}) => {
  const totalPercentage = malePercentage + femalePercentage
  const adjustedMalePercentage = (malePercentage / totalPercentage) * 100
  const adjustedFemalePercentage = (femalePercentage / totalPercentage) * 100

  return (
    <View style={styles.progressBarContainer}>
      <View
        style={[
          styles.progressBarFill,
          styles.blueBar,
          { width: `${adjustedMalePercentage}%`, backgroundColor: palette.gender.male }
        ]}
      />

      <View
        style={[
          styles.progressBarFill,
          styles.pinkBar,
          {
            width: `${adjustedFemalePercentage}%`,
            left: `${adjustedMalePercentage}%`,
            backgroundColor: palette.gender.female
          }
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 4,
    borderRadius: 5,
    backgroundColor: '#eee',
    overflow: 'hidden',
    position: 'relative'
  },
  progressBarFill: {
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0
  },
  blueBar: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  pinkBar: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  }
})
