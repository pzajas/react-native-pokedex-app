import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { Alert } from 'react-native'
import { auth } from '../../services/firebase/firebase'

interface IUserCredentials {
  email: string
  password: string
}

export const registerUser = async ({ email, password }: IUserCredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)

    await sendEmailVerification(userCredential.user)

    Alert.alert(
      'Registration Successful',
      `A verification email has been sent to ${userCredential.user.email}. Please check your inbox.`
    )
  } catch (error) {
    if (error instanceof FirebaseError) {
      Alert.alert('Registration Failed', error.message)
    } else {
      Alert.alert('Registration Failed', 'An unknown error occurred.')
    }
  }
}

export const loginUser = async ({ email, password }: IUserCredentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)

    if (!userCredential.user.emailVerified) {
      Alert.alert('Email Not Verified', 'Please verify your email address before logging in.')
      await auth.signOut()
      return
    }

    Alert.alert('Login Successful', `Welcome back, ${userCredential.user.email}!`)
  } catch (error) {
    if (error instanceof FirebaseError) {
      Alert.alert('Login Process Failed', error.message)
    } else {
      Alert.alert('Login Process Failed', 'An unknown error occurred.')
    }
  }
}

export const resetPassword = async ({ email }: { email: string }) => {
  try {
    await sendPasswordResetEmail(auth, email)
    Alert.alert('Password Reset', 'A password reset email has been sent.')
  } catch (error) {
    if (error instanceof FirebaseError) {
      Alert.alert('Password Reset Failed', error.message)
    } else {
      Alert.alert('Password Reset Failed', 'An unknown error occurred.')
    }
  }
}
