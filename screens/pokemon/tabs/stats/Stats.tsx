import { useLocalSearchParams } from 'expo-router'
import { random } from 'lodash'

import { typography } from '@/constants/typography'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getBackgroundColor } from '@/utils/colors/getPokemonStatColor'

import { PokeTabSectionHeader } from '../PokeTabSectionHeader'
import { PokemonStatsBarItem } from './components/PokemonStatsBarItem'
import { statsLabels, statsValues } from './PokeStatsConfig'

export const Stats = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { stats } = usePokemonData(name)

  return (
    <>
      <PokeTabSectionHeader title={typography.tabs.stats} />
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
