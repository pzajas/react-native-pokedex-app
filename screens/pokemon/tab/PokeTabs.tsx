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
}

export const PokeTabs = ({ currentPokemon }: ICurrentPokemon) => {
  const tabs = [
    { label: 'About', component: <About currentPokemon={currentPokemon} /> },
    { label: 'Stats', component: <Stats currentPokemon={currentPokemon} /> },
    { label: 'Evolution', component: <Evolution /> },
    { label: 'Moves', component: <Moves currentPokemon={currentPokemon} /> }
  ]

  const [selectedTab, setSelectedTab] = useState(tabs[0].label)

  return (
    <View>
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

      <View style={styles.tabContentContainer}>{tabs.find((tab) => tab.label === selectedTab)?.component}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    padding: 10
  },
  tabContentContainer: {
    padding: 16
  }
})
