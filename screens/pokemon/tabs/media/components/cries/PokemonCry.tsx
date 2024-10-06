import { usePlaySound } from '@/hooks/usePlaySound'
import { Feather } from '@expo/vector-icons'
import { Animated, StyleSheet, View } from 'react-native'

export const PokemonCry = ({ soundUrl }: { soundUrl: string }) => {
  const { progress, playSound } = usePlaySound(soundUrl)

  return (
    <View style={styles.container}>
      <Feather name="play" size={20} color="black" onPress={playSound} />
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%']
              })
            }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  progressBarContainer: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 8
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#76c7c0'
  }
})
