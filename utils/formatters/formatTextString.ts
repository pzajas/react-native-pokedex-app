export const formatText = (text: string) => {
  return text.replace(/♀/g, '').replace(/\s+/g, ' ').trim()
}
