import { useLocalSearchParams } from 'expo-router'
import { capitalize } from 'lodash'
import { StyleSheet, View } from 'react-native'

import { typography } from '@/constants/typography'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { getFirstWord } from '@/utils/strings/getFirstWordFromString'

import { PokeTabSectionHeader } from '../../../PokeTabSectionHeader'
import { InfoRow } from './PokemonInformationRow'

export const Information = () => {
  const { name }: { name: string } = useLocalSearchParams()
  const { weight, height, abilities, genera, habitat, shape } = usePokemonData(name)

  const pokemonHeight = height ?? null
  const pokemonWeight = weight ?? null

  const firstWords = genera?.map(getFirstWord) || []

  return (
    <>
      <PokeTabSectionHeader title={typography.tabs.information} />
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

        <View style={styles.row}>
          <View style={styles.columnItem}>
            <InfoRow label="Habitat:" value={pokemonHeight ? `${habitat}` : 'N/A'} />
          </View>
          <View style={styles.columnItem}>
            <InfoRow label="Shape:" value={pokemonWeight ? `${shape}` : 'N/A'} />
          </View>
        </View>
      </View>
    </>
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
