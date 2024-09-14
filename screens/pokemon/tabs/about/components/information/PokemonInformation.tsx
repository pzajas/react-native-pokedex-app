import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { StyleSheet, View } from 'react-native'

import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getFirstWord } from '@/utils/strings/getFirstWordFromString'

import { InfoRow } from './PokemonInformationRow'
import { InfoSection } from './PokemonInformationSection'

export const Information = () => {
  const { name } = useLocalSearchParams()
  const { pokemon, species } = usePokemonData(name as string)

  const { weight, height, abilities } = pokemon ?? {}
  const { genera } = species ?? {}

  const pokemonHeight = height ?? null
  const pokemonWeight = weight ?? null

  const firstWords = genera?.map(getFirstWord) || []

  return (
    <InfoSection title="Information">
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.columnItem}>
            <InfoRow label="Species:" value={firstWords.join(', ')} />
          </View>
          <View style={styles.columnItem}>
            <InfoRow label="Ability:" value={(abilities && capitalize(abilities[0])) || 'N/A'} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.columnItem}>
            <InfoRow label="Height:" value={pokemonHeight ? `${pokemonHeight / 10}m` : 'N/A'} />
          </View>
          <View style={styles.columnItem}>
            <InfoRow label="Weight:" value={pokemonWeight ? `${pokemonWeight / 10}kg` : 'N/A'} />
          </View>
        </View>
      </View>
    </InfoSection>
  )
}

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10
  },
  columnItem: {
    flex: 1
  }
})
