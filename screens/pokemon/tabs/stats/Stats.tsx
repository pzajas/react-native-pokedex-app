import { useLocalSearchParams } from 'expo-router'

import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getBackgroundColor } from '@/utils/colors/getPokemonStatColor'

import { PokemonStatsBarItem } from './components/PokemonStatsBarItem'
import { statsLabels, statsValues } from './PokeStatsConfig'

import { TabSectionHeader } from '@/components/headers/TabSectionHeader'
import { typography } from '@/constants/typography'
import { random } from 'lodash'

export const Stats = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { stats } = usePokemonData(name)

  return (
    <>
      <TabSectionHeader title={typography.tabs.stats} />

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
    </>
  )
}
