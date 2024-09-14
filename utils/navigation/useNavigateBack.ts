import { useRouter } from 'expo-router'

export const useNavigateBack = () => {
  const router = useRouter()

  const navigateBack = () => {
    router.back()
  }

  return navigateBack
}
