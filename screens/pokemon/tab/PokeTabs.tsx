import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { About, Evolution, Moves, Stats } from './content'
import { PokeTabButton } from './PokeTabButton'

interface IMove {
  name: string
  type: string
}
interface IStats {
  attack: number
  defense: number
  hp: number
  'special-attack': number
  'special-defense': number
  speed: number
}
interface IGender {
  female: number
  genderless: boolean
  male: number
}
export interface IPokemon {
  abilities: string[]
  category: string
  color: string
  descriptions: string[]
  gender: IGender
  height: number
  id: string
  image: string
  moves: IMove[]
  name: string
  stats: IStats
  types: string[]
  weight: number
}
export interface ICurrentPokemon {
  currentPokemon: IPokemon
  speciesData: any
  pokemonDetails: any
}

export const PokeTabs = () => {
  const tabs = [
    {
      label: 'About',
      component: <About />
    },
    { label: 'Stats', component: <Stats /> },
    { label: 'Evolution', component: <Evolution /> },
    { label: 'Moves', component: <Moves /> }
  ]

  const [selectedTab, setSelectedTab] = useState(tabs[0].label)

  return (
    <View style={styles.container}>
      <View style={styles.tabHeaderContainer}>
        <View style={styles.tabHeader}>
          {tabs.map((tab) => (
            <PokeTabButton
              key={tab.label}
              label={tab.label}
              isActive={selectedTab === tab.label}
              onPress={() => setSelectedTab(tab.label)}
            />
          ))}
        </View>
      </View>
      <View style={styles.tabContentContainer}>{tabs.find((tab) => tab.label === selectedTab)?.component}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 80
  },
  tabHeaderContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
    overflow: 'hidden'
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingTop: 32
  },
  tabContentContainer: {
    flex: 1,
    padding: 16
  }
})
