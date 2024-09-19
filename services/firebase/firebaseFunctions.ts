import { PokemonData } from '@/typescript/types/pokemonTypes'
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../../services/firebase/firebase'
import { queryClient } from '../tanstack/queryClient'
interface IUserCredentials {
  email: string
  password: string
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

const getFavoritesRef = () => {
  const user = auth.currentUser
  if (!user) {
    throw new Error('User is not authenticated')
  }
  return collection(doc(firestore, 'pokemons', user.uid), 'favorites')
}

export const addFavoritePokemon = async (pokemon: PokemonData) => {
  console.log(pokemon, 'pokemon from add to fav')

  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User is not authenticated')
    }

    const pokemonRef = doc(firestore, 'pokemons', user.uid, 'favorites', pokemon.name)
    await setDoc(pokemonRef, {
      backgroundColors: pokemon.backgroundColors,
      chipColors: pokemon.chipColors,
      extendedId: pokemon.extendedId,
      name: pokemon.name,
      shortenedId: pokemon.shortenedId,
      types: pokemon.types,
      url: pokemon.url
    })

    console.log('Pokemon added to favorites successfully')
  } catch (error) {
    console.error('Error adding Pokémon to favorites:', error)
  }
}

export const removeFavoritePokemon = async (pokemonName: string) => {
  try {
    const docRef = doc(getFavoritesRef(), pokemonName)
    console.log('Document reference:', docRef.path)

    const docSnapshot = await getDoc(docRef)
    if (docSnapshot.exists()) {
      console.log('Document exists, proceeding to delete.')
      await deleteDoc(docRef)
      console.log(`${pokemonName} has been removed from favorites.`)
    } else {
      console.log('Document does not exist, cannot delete.')
    }
  } catch (error) {
    console.error('Error removing favorite Pokémon:', error)
  }
}

export const isFavoritePokemon = async (pokemonName: string): Promise<boolean> => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User is not authenticated')
    }

    const pokemonRef = doc(getFavoritesRef(), pokemonName)
    const docSnap = await getDoc(pokemonRef)
    return docSnap.exists()
  } catch (error) {
    console.error('Error checking favorite Pokémon status:', error)
    return false
  }
}

export const fetchFavoritePokemons = async (): Promise<PokemonData[]> => {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error('User is not authenticated')
    }

    const favoritesRef = collection(firestore, 'pokemons', user.uid, 'favorites')
    const snapshot = await getDocs(favoritesRef)

    const favoritePokemons: PokemonData[] = snapshot.docs.map((doc) => {
      const data = doc.data()

      return {
        id: data.id,
        backgroundColors: data.backgroundColors || [],
        chipColors: data.chipColors || [],
        extendedId: data.extendedId || '',
        name: data.name || '',
        shortenedId: data.shortenedId || '',
        types: data.types || [],
        url: data.url || '',
        species: data.species || [],
        stats: data.stats || []
      }
    })

    return favoritePokemons
  } catch (error) {
    console.error('Error fetching favorite Pokémon:', error)
    return []
  }
}
