import { useRouter } from 'expo-router'
export interface IEvolutionsItem {
  item: { name: string; id: number }
  name: string
}

export const useNavigatePokemon = () => {
  const router = useRouter()

  const handleNavigatePokemon = (name: string, id: number) => {
    router.push({
      pathname: '/pokemon/[name]',
      params: {
        name,
        id
      }
    })
  }

  return handleNavigatePokemon
}
