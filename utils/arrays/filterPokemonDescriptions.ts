export const filterPokemonDescriptions = (descriptions: string[]) => {
  const maximumDescriptionLength = 130
  return descriptions.filter((desc) => desc.length <= maximumDescriptionLength)
}
