export const formatText = (text: string): string => {
  // Helper function to capitalize the first letter of a sentence
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  // Split the text into sentences based on periods followed by spaces or new lines
  return text
    .replace(/♀/g, '') // Remove specific unwanted characters
    .replace(/\s+/g, ' ') // Replace multiple whitespace characters with a single space
    .trim() // Trim leading and trailing whitespace
    .toLowerCase() // Convert all text to lowercase
    .split(/(?<=[.])\s+/) // Split on periods followed by spaces or new lines
    .map((sentence, index) => {
      // Capitalize the first letter of the sentence
      const capitalizedSentence = capitalizeFirstLetter(sentence.trim())
      // Preserve "pokemon" if it appears at the start of a sentence
      return capitalizedSentence.replace(/^pokemon\b/, 'Pokemon')
    })
    .join(' ')
}
