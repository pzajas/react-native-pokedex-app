export const formatText = (text: string): string => {
  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

  return text
    .replace(/♀/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
    .split(/(?<=[.])\s+/)
    .map((sentence) => {
      const capitalizedSentence = capitalizeFirstLetter(sentence.trim())
      return capitalizedSentence.replace(/^pokemon\b/, 'Pokemon')
    })
    .join(' ')
}
