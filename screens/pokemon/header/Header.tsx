import { CustomText } from '@/components/typography/customText'
import palette from '@/constants/palette'
import { IconButton } from '@/screens/pokemons/components/search/SearchBarButton'
import { auth, firestore } from '@/services/firebase/firebase'
import { useNavigateBack } from '@/utils/navigation/useNavigateBack'
import { useLocalSearchParams } from 'expo-router'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { capitalize } from 'lodash'
import { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'

export const Header = () => {
  const navigateBack = useNavigateBack()
  const { name, backgroundColor, shortenedId, extendedId, url } = useLocalSearchParams()
  const [isFavorite, setIsFavorite] = useState(false)

  const checkIfFavorite = async () => {
    const userId = auth.currentUser?.uid
    if (!userId) return

    const q = query(collection(firestore, `users/${userId}/favorites`), where('shortenedId', '==', shortenedId))
    const querySnapshot = await getDocs(q)
    setIsFavorite(!querySnapshot.empty)
  }

  const addFavoritePokemon = async () => {
    const userId = auth.currentUser?.uid
    if (!userId) {
      alert('You must be logged in to add favorites.')
      return
    }

    try {
      await addDoc(collection(firestore, `users/${userId}/favorites`), {
        name,
        shortenedId,
        extendedId,
        backgroundColors: ['#aac634', '#95addf'],
        chipColors: ['#8f9f2c', '#7890bf'],
        types: ['Bug', 'Flying'],
        url
      })
      setIsFavorite(true)
      alert(`${capitalize(name)} added to favorites!`)
    } catch (error) {
      console.error('Error adding document: ', error)
      alert('Failed to add to favorites.')
    }
  }

  useEffect(() => {
    checkIfFavorite()
  }, [shortenedId])

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor: backgroundColor
        }}
      >
        <IconButton name={'chevron-left'} size={32} color={palette.colors.white} onPress={navigateBack} />
        <CustomText style={styles.text}>{capitalize(name)}</CustomText>
        <IconButton
          name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
          size={28}
          color={isFavorite ? palette.colors.red.medium : palette.colors.white}
          onPress={addFavoritePokemon}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: palette.colors.white
  }
})
