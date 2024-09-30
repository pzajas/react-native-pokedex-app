// usePlaySound.ts
import { Audio, AVPlaybackStatus } from 'expo-av'
import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

export const usePlaySound = (soundUrl: string) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const progress = useRef(new Animated.Value(0)).current

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: soundUrl })
      setSound(sound)
      progress.setValue(0)

      await sound.playAsync()

      const playbackStatusUpdate = async () => {
        const status: AVPlaybackStatus = await sound.getStatusAsync()
        if (status.isLoaded) {
          const newProgress = status.durationMillis ? status.positionMillis / status.durationMillis : 0
          Animated.timing(progress, {
            toValue: newProgress,
            duration: 50,
            useNativeDriver: false
          }).start()
        }

        if (status.isLoaded && status.didJustFinish) {
          Animated.timing(progress, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false
          }).start(() => {
            setTimeout(() => {
              progress.setValue(0)
            }, 1000)
          })
        } else {
          setTimeout(playbackStatusUpdate, 50)
        }
      }

      playbackStatusUpdate()
    } catch (error) {
      console.error('Error playing sound:', error)
    }
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync()
      }
    }
  }, [sound])

  return { progress, playSound }
}
