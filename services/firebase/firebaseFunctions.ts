import { PokemonData } from '@/typescript/types/pokemonTypes'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { getDownloadURL, listAll, ref, uploadBytesResumable } from 'firebase/storage'
import { capitalize } from 'lodash'
import { auth, firestore, storage } from '../../services/firebase/firebase'
import { queryClient } from '../tanstack/queryClient'
interface IUserCredentials {
  email: string
  password: string
}
interface PokemonFavoriteData {
  name: string | undefined
  shortenedId: string | undefined
  extendedId: string | undefined
  backgroundColor: string | undefined
  typesArray: string[] | undefined
  url: string | undefined
}

export const registerUser = async ({ email, password }: IUserCredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    await sendEmailVerification(userCredential.user)

    console.log(
      'Registration Successful',
      `A verification email has been sent to ${userCredential.user.email}. Please check your inbox.`
    )
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log('Registration Failed', error.message)
    } else {
      console.log('Registration Failed', 'An unknown error occurred.')
    }
  }
}

export const loginUser = async ({ email, password }: IUserCredentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if (!userCredential.user.emailVerified) {
      console.log('Email Not Verified', 'Please verify your email address before logging in.')
      await auth.signOut()
      return
    }

    console.log('Login Successful', `Welcome back, ${userCredential.user.email}!`)
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log('Login Process Failed', error.message)
    } else {
      console.log('Login Process Failed', 'An unknown error occurred.')
    }
  }
}

export const resetPassword = async ({ email }: { email: string }) => {
  try {
    await sendPasswordResetEmail(auth, email)
    console.log('Password Reset', 'A password reset email has been sent.')
  } catch (error) {
    if (error instanceof FirebaseError) {
      console.log('Password Reset Failed', error.message)
    } else {
      console.log('Password Reset Failed', 'An unknown error occurred.')
    }
  }
}

export const logoutUser = async () => {
  try {
    queryClient.removeQueries()
    queryClient.invalidateQueries()
    await signOut(auth)
    console.log('Success', 'You have been logged out.')
  } catch (error) {
    console.log('Error', 'An error occurred while logging out.')
  }
}

//POKEMONS

export const fetchFavoritePokemons = async (): Promise<PokemonData[]> => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User is not authenticated')
    }

    const favoritesRef = collection(firestore, 'users', user.uid, 'favorites')
    const snapshot = await getDocs(favoritesRef)

    const favoritePokemons: PokemonData[] = snapshot.docs.map((doc) => {
      const data = doc.data()

      return {
        id: data.id,
        backgroundColor: data.backgroundColor,
        chipColors: data.chipColors || [],
        extendedId: data.extendedId || '',
        name: data.name || '',
        shortenedId: data.shortenedId || '',
        types: data.types || [],
        url: data.url || '',
        species: data.species || [],
        stats: data.stats || [],
        isFavorite: false
      }
    })

    return favoritePokemons
  } catch (error) {
    console.error('Error fetching favorite Pokémon:', error)
    return []
  }
}

export const checkIfFavorite = async (shortenedId: string | undefined): Promise<boolean> => {
  const userId = auth.currentUser?.uid

  if (!userId || !shortenedId) return false

  try {
    const q = query(collection(firestore, `users/${userId}/favorites`), where('shortenedId', '==', shortenedId))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  } catch (error) {
    console.error('Error checking favorites:', error)
    return false
  }
}

export const toggleFavoritePokemon = async (
  pokemonData: PokemonFavoriteData,
  setIsFavorite: (isFavorite: boolean) => void
) => {
  const { name, shortenedId, extendedId, backgroundColor, typesArray, url } = pokemonData

  const userId = auth.currentUser?.uid

  if (!userId) {
    alert('You must be logged in to add favorites.')
    return
  }

  try {
    const q = query(collection(firestore, `users/${userId}/favorites`), where('shortenedId', '==', shortenedId))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      await addDoc(collection(firestore, `users/${userId}/favorites`), {
        name,
        shortenedId,
        extendedId,
        backgroundColor,
        types: typesArray,
        url
      })
      setIsFavorite(true)
      alert(`${capitalize(name)} added to favorites!`)
    } else {
      const docId = querySnapshot.docs[0].id
      await deleteDoc(doc(firestore, `users/${userId}/favorites/${docId}`))
      setIsFavorite(false)
      alert(`${capitalize(name)} removed from favorites!`)
    }
  } catch (error) {
    console.error('Error toggling favorite: ', error)
    alert('Failed to toggle favorite status.')
  }
}

export const fetchImages = async (name: string) => {
  const storageRef = ref(storage, `images/${name}/`)
  const listResponse = await listAll(storageRef)
  const urls = await Promise.all(listResponse.items.map((item) => getDownloadURL(item)))
  return urls
}

export const uploadImage = async (pickedUri: string, name: string): Promise<string> => {
  const response = await fetch(pickedUri)
  const blob = await response.blob()
  const storageRef = ref(storage, `images/${name}/${Date.now()}`)

  const uploadTask = uploadBytesResumable(storageRef, blob)

  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(`Upload is ${progress}% done`)
      },
      (error) => {
        console.error('Upload failed:', error.code, error.message)
        reject(new Error(error.message))
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}
