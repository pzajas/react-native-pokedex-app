import { useLocalSearchParams, useRouter } from 'expo-router'
interface NavigatePokemonParams {
  name: string
  id: number
}

export const useNavigateEvolution = () => {
  const router = useRouter()
  const { backgroundColor } = useLocalSearchParams()

  const navigate = ({ name, id }: NavigatePokemonParams) => {
    router.push({
      pathname: '/pokemon/[name]',
      params: {
        name,
        backgroundColor,
        shortenedId: id
      }
    })
  }

  return navigate
}
