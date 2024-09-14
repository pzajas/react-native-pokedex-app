import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { PokeTabButton } from './PokeTabButton'
import { tabs } from './PokeTabsConfig'

import palette from '@/constants/palette'

export const PokeTabs = () => {
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
              accessibilityRole="tab"
              accessibilityState={{ selected: selectedTab === tab.label }}
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    zIndex: 80,
    backgroundColor: palette.colors.white
  },
  tabHeaderContainer: {
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    elevation: 4,
    backgroundColor: palette.colors.white
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
