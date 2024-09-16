const tintColorLight = '#2f95dc'
const tintColorDark = '#fff'

export default {
  colors: {
    white: '#FFFFFF',

    black: '#000000',
    transparent: 'rgba(0, 0, 0, 0)',
    grey: {
      light: '#D3D3D3', // Light Grey
      medium: '#808080', // Medium Grey
      dark: '#333333' // Dark Grey
    },
    yellow: {
      light: '#FFFFE0',
      medium: '#FFFF00',
      dark: '#FFD700'
    },
    red: {
      light: '#FFCCCC',
      medium: '#FF0000',
      dark: '#8B0000'
    },
    orange: {
      light: '#FFE5B4',
      medium: '#FFA500',
      dark: '#FF8C00'
    }
  },
  light: {
    text: '#000',
    textLight: '#fff',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight
  },
  dark: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight
  },
  typeColors: {
    fire: '#fba64a',
    water: '#5face2',
    grass: '#5dc067',
    electric: '#F4D23C',
    ice: '#7bd3c6',
    fighting: '#d7425a',
    poison: '#b363cd',
    ground: '#d58858',
    flying: '#95addf',
    psychic: '#f87c7a',
    bug: '#aac634',
    rock: '#cabb8a',
    ghost: '#5c6cb8',
    dragon: '#0970c8',
    dark: '#818796',
    steel: '#5599a5',
    fairy: '#ee92e6',
    default: '#9b9ea1'
  } as { [key: string]: string },
  chipColors: {
    fire: '#e28c3f',
    water: '#4e98c4',
    grass: '#4da055',
    electric: '#d7bf4c',
    ice: '#6ab1a8',
    fighting: '#b83648',
    poison: '#944ba9',
    ground: '#b96f48',
    flying: '#7890bf',
    psychic: '#d26766',
    bug: '#8f9f2c',
    rock: '#a89572',
    ghost: '#4b579b',
    dragon: '#085c9f',
    dark: '#6d707c',
    steel: '#467d89',
    fairy: '#cc7cc2',
    normal: '#7f8183'
  } as { [key: string]: string },
  gender: {
    female: '#ff66b9',
    male: '#369fff'
  }
}
