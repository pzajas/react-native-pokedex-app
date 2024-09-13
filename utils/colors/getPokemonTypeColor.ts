import palette from '@/constants/palette'

type TypeColor = 'background' | 'chip'

export const getPokemonTypeColor = (name: string, colorSet: TypeColor = 'background') => {
  const colorPalette = colorSet === 'background' ? palette.typeColors : palette.chipColors
  const colorKey = name?.toLowerCase()
  return colorPalette[colorKey] || colorPalette.default
}
