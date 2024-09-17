import { auth } from '@/services/firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useLoggedUser = () => {
  const [userId, setUserId] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        setUserId(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { userId, loading }
}
