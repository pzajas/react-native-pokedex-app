export const formatPokemonDescription = (description: string): string => {
  return description
    .split(/(\.\s*|\.\n|\n)/)
    .map((sentence, index) => {
      const trimmedSentence = sentence.trim()

      if (trimmedSentence.length === 0) return ''

      const firstLetter = trimmedSentence.charAt(0).toUpperCase()
      const restOfSentence = trimmedSentence.slice(1).toLowerCase()

      return index === 0 ? `${firstLetter}${restOfSentence}` : `${firstLetter}${restOfSentence}`
    })
    .join(' ')
}
