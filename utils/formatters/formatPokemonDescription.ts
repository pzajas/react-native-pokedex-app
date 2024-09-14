export const formatPokemonDescription = (description: string): string => {
  // Normalize the description to handle different Unicode representations
  const normalizedDescription = description.normalize('NFKC')

  // Remove unwanted special characters, including form feed
  const cleanedDescription = normalizedDescription
    .replace(/[\u000C♀]/g, '') // Remove form feed (\u000C) and specific unwanted characters
    .replace(/[^\w\s\.\-]/g, '') // Remove other special characters (except for periods and dashes)
    .trim()

  // Split the cleaned description into sentences based on periods followed by spaces or new lines
  return cleanedDescription
    .split(/(?<=[.])\s+/) // Split on periods followed by spaces or new lines
    .map((sentence, index) => {
      const trimmedSentence = sentence.trim()

      if (trimmedSentence.length === 0) return '' // Skip empty strings

      const firstLetter = trimmedSentence.charAt(0).toUpperCase()
      const restOfSentence = trimmedSentence.slice(1).toLowerCase()

      return index === 0 ? `${firstLetter}${restOfSentence}` : `${firstLetter}${restOfSentence}`
    })
    .join(' ')
}
