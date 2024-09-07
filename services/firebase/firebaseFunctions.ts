import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { auth } from '../../services/firebase/firebase'

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
    await signOut(auth)
    console.log('Success', 'You have been logged out.')
  } catch (error) {
    console.log('Error', 'An error occurred while logging out.')
  }
}
