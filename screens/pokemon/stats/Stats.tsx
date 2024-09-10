import { CustomText } from '@/components/typography/customText'
import palette from '@/constants/palette'
import { random } from 'lodash'
import { StyleSheet, View } from 'react-native'
import { PokemonStatsBarItem } from './components/PokemonStatsBarItem'

export const Stats = ({ currentPokemon }: any) => {
  const { attack, defense, hp, 'special-attack': spAtk, 'special-defense': spDef, speed } = currentPokemon?.stats || {}
  const totalStats = attack + defense + hp + spAtk + spDef + speed
  const maxValue = 255

  const stats = [
    { label: 'Health', value: hp },
    { label: 'Attack', value: attack },
    { label: 'Defense', value: defense },
    { label: 'S. Att', value: spAtk },
    { label: 'S. Def', value: spDef },
    { label: 'Speed', value: speed },
    { label: 'Total', value: totalStats }
  ]

  const primaryType = currentPokemon?.types[0] || 'default'
  const backgroundColor = palette.typeColors[primaryType] || palette.typeColors.default

  return (
    <View style={styles.container}>
      <CustomText weight="semibold" style={styles.title}>
        Base Stats
      </CustomText>

      {stats.map((stat, index) => (
        <PokemonStatsBarItem
          key={currentPokemon?.id + index}
          label={stat.label}
          value={stat.value}
          maxValue={maxValue}
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
