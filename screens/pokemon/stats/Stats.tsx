import { CustomText } from '@/components/typography/customText'
import palette from '@/constants/palette'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { useLocalSearchParams } from 'expo-router'
import { random } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { PokemonStatsBarItem } from './components/PokemonStatsBarItem'

export const Stats = ({ currentPokemon }: any) => {
  const { name } = useLocalSearchParams()
  const { pokemon } = usePokemonData(name)
  const { stats, moves, forms } = pokemon ?? {}

  const labelMap = {
    hp: 'Health',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Att',
    'special-defense': 'Sp. Def',
    speed: 'Speed'
  }

  const primaryType = currentPokemon?.types[0] || 'default'
  const backgroundColor = palette.typeColors[primaryType] || palette.typeColors.default

  return (
    <View>
      <CustomText weight="semibold" style={styles.title}>
        Base Stats
      </CustomText>

      {stats?.map((stat, index) => (
        <PokemonStatsBarItem
          key={index}
          label={labelMap[stat.name] || stat.name}
          value={stat.value}
          maxValue={255}
          backgroundColor={backgroundColor}
          min={random(80, 200)}
          max={random(200, 300)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'space-around',
    gap: 10
  },
  title: {
    marginBottom: 10,
    fontSize: 16
  }
})
