export const formatPokemonDescription = (description: string): string => {
  const normalizedDescription = description.normalize('NFKC')

  const cleanedDescription = normalizedDescription
    .replace(/[\u000C♀]/g, '')
    .replace(/[^\w\s\.\-]/g, '')
    .trim()

  return cleanedDescription
    .split(/(?<=[.])\s+/)
    .map((sentence, index) => {
      const trimmedSentence = sentence.trim()

      if (trimmedSentence.length === 0) return ''

      const firstLetter = trimmedSentence.charAt(0).toUpperCase()
      const restOfSentence = trimmedSentence.slice(1).toLowerCase()

      return index === 0 ? `${firstLetter}${restOfSentence}` : `${firstLetter}${restOfSentence}`
    })
    .join(' ')
}
