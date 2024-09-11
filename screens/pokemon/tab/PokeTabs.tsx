import { About, Evolution, Moves, Stats } from '@/screens/pokemon/tab/content'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { PokeTabButton } from './PokeTabButton'

interface IPokeTabs {
  currentPokemon: any
}

export const PokeTabs = ({ currentPokemon }: IPokeTabs) => {
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
