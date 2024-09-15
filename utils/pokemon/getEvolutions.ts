export const getEvolutions = (chain: any): { name: string; id: number; evolutionDetails?: any }[] => {
  let evolutions: { name: string; id: number; evolutionDetails?: any }[] = []

  const traverseChain = (currentChain: any) => {
    if (currentChain && currentChain.species) {
      const idMatch = /\/(\d+)\//.exec(currentChain.species.url)
      const id = idMatch ? parseInt(idMatch[1], 10) : null

      const evolutionDetails = currentChain.evolution_details ? currentChain.evolution_details[0] : {}

      evolutions.push({
        name: currentChain.species.name,
        id: id,
        evolutionDetails: evolutionDetails
      })

      currentChain.evolves_to.forEach((nextChain: any) => traverseChain(nextChain))
    }
  }

  traverseChain(chain)
  return evolutions
}
