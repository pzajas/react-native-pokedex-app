import typesData from '../../services/data/types.json'
export interface IMatchedPokemon {
  id: number
  name: string
  typeList: string[]
}

export const getCurrentPokemon = (pokemonName: string) => {
  return typesData.find((pokemon: IMatchedPokemon) => pokemon.name.toLowerCase() === pokemonName.toLowerCase())
}
