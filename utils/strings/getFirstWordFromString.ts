export const getFirstWord = (text?: string | null): string => {
  return text?.split(' ')[0] ?? ''
}
