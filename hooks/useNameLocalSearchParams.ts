import { useLocalSearchParams } from 'expo-router'

export const useNameLocalSearchParams = () => {
  const params = useLocalSearchParams()

  return {
    name: (params.name as string) || ''
  }
}
