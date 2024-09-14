import { useLocalSearchParams } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { CustomText } from '@/components/typography/customText'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getBackgroundColor } from '@/utils/colors/getPokemonStatColor'

import { PokemonStatsBarItem } from './components/PokemonStatsBarItem'
import { statsLabels, statsValues } from './PokeStatsConfig'

import { random } from 'lodash'

export const Stats = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { pokemon } = usePokemonData(name)
  const { stats } = pokemon ?? {}

  return (
    <View>
      <CustomText weight="semibold" style={styles.title}>
        Base Stats
      </CustomText>

      {stats?.map((stat) => (
        <PokemonStatsBarItem
          key={stat.name}
          label={statsLabels[stat.name] || stat.name}
          value={stat.value}
          maxValue={statsValues.maxStatValue}
          backgroundColor={getBackgroundColor(stat.value)}
          min={random(statsValues.minRandomValue, statsValues.maxRandomValue - statsValues.minStatValue)}
          max={random(statsValues.maxRandomValue - statsValues.minStatValue, statsValues.maxRandomValue)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    padding: 16,
    gap: 10
  },
  title: {
    marginBottom: 10,
    fontSize: 16
  }
})
