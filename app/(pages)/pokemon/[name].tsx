import { Header } from '@/screens/pokemon/main/Header'
import { PokeTabs } from '@/screens/pokemon/tab/PokeTabs'
import { usePokemonData } from '@/services/hooks/usePokemonData'
import { useLocalSearchParams } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'

export default function PokemonScreen() {
  const { name, artwork, backgroundColor } = useLocalSearchParams()
  const { pokemon, species } = usePokemonData(name)

  return (
    <View style={[styles.outerContainer, { backgroundColor }]}>
      <Header name={name} />
      <View style={styles.tabContainer}>
        <Image source={require('../../../assets/images/pokeball.png')} style={styles.pokeballImage} />
        <Image source={{ uri: artwork }} style={styles.pokemonImage} />
        <PokeTabs />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  tabContainer: {
    justifyContent: 'flex-end',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    height: '60%',
    position: 'relative' // Ensure the tabContainer can position its children absolutely
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    top: -200,
    alignSelf: 'center',
    zIndex: 100 // Ensure the Pokémon image is on top
  },
  pokeballImage: {
    width: 450, // Adjust the size as needed
    height: 450, // Adjust the size as needed
    position: 'absolute',
    top: -275, // Adjust the position to fit behind the Pokémon image
    alignSelf: 'center',
    zIndex: 50, // Ensure the Pokéball image is behind the Pokémon image,
    opacity: 0.1,
    tintColor: 'white'
  }
})
