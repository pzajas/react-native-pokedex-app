import { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'

interface IPokeTabWrapper {
  children: ReactNode
}

export const PokeTabWrapper = ({ children }: IPokeTabWrapper) => {
  return <View style={styles.container}>{children}</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  }
})
