import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getReactNativePersistence, GoogleAuthProvider, initializeAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import constants from '../../constants/constants'

const FIREBASE_API_KEY = constants.FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'react-native-pokedex-app.firebaseapp.com',
  projectId: 'react-native-pokedex-app',
  storageBucket: 'react-native-pokedex-app.appspot.com',
  messagingSenderId: '270499957297',
  appId: '1:270499957297:web:32b72798e67427de99a310',
  measurementId: 'G-2FJSP96KRS'
}

export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const database = getDatabase(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
