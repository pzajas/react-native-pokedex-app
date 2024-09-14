import palette from '@/constants/palette'

export const getBackgroundColor = (value: number): string => {
  if (value < 100) return palette.colors.red.medium
  if (value < 200) return palette.colors.yellow.dark
  if (value < 300) return palette.colors.orange.dark
  return 'green'
}
