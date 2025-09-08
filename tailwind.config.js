/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./App.tsx', './components/**/*.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Neutral colors
        neutral: {
          0: '#101010',
          5: '#1d1d1d',
          10: '#292929',
          30: '#575757',
          90: '#ededed',
          95: '#f5f5f5',
          100: '#ffffff',
        },
        // Primary colors
        primary: {
          10: '#3d000b',
          40: '#db0011',
        },
        // Text colors
        textPrimary: '#1d1d1d',
        'textPrimary-dark': '#ffffff',
        textSecondary: '#575757',
        textAccent: '#347893',
        'textSecondary-dark': '#BDBDBD',
        textTetriary: '#767676',
        'textTetriary-dark': '#fff',
        textWhite: '#ffffff',
        textAction: '#DB0011',
        'textAction-dark': '#F96262',
        textSuccess: '#00847F',
        'textSuccess-dark': '#59C0B9',
        textError: '#a8000b',
        'textError-dark': '#EC656E',
        textDisabled: '#A3A3A3',
        textActionDark: '#730014',
        'textActionDark-dark': '#FE9090',
        textInfoDark: '#234261',

        // Surface colors
        surfacePrimary: '#ffffff',
        'surfacePrimary-dark': '#1D1D1D',
        surfacePrimaryPress: '#D7D7D7',
        'surfacePrimaryPress-dark': '#101010',
        surfaceSecondary: '#f5f5f5',
        'surfaceSecondary-dark': '#101010',
        surfaceTertiary: '#ededed',
        'surfaceTertiary-dark': '#292929',
        surfaceQuaternary: '#d7d7d7',
        'surfaceQuaternary-dark': '#3D3D3D',
        surfaceAccent: '#347893',
        surfaceAccentLight: '#e7f7fe',
        surfaceAccentLighter: '#469cbe',
        surfaceAccentTransparent: '#469cbe33',
        surfaceAction: '#DB0011',
        surfaceActionPress: '#730014',
        'surfaceAction-dark': '#ED3535',
        surfaceDisabled: '#ededed',
        surfaceSuccess: '#00847f',
        'surfaceSuccess-dark': '#59C0B9',
        surfaceSuccessLight: '#E5F2F2',
        'surfaceSuccessLight-dark': '#18A59E26',
        surfaceInfoLight: '#3F72A626',
        'surfaceInfoLight-dark': '#3F72A626',
        surfaceError: '#a8000b',
        surfaceNeutral: '#EDEDED',
        'surfaceNeutral-dark': '#292929',
        surfaceWarning: '#FFBB33',
        surfaceInfo: '#305A85',
        surfaceErrorLight: '#f9f2f3',
        'surfaceErrorLight-dark': '#C7232E26',
        'surfaceDisabledWhite-dark': '#1D1D1DCC',
        'surfaceDisabled-dark': '#292929',
        surfaceDark: '#767676',
        'surfaceDark-dark': '#FFFFFF',

        // Icon colors
        iconBlack: '#1d1d1d',
        iconDefault: '#767676',
        iconInfo: '#305a85',
        'iconInfo-dark': '#6F9ECE',
        iconError: '#a8000b',
        'iconError-dark': '#EC656E',
        iconSuccess: '#00847f',
        iconSuccessDark: '#004745',
        'iconSuccess-dark': '#59C0B9',

        // Border colors
        borderPrimaryDefault: '#d7d7d7',
        'borderPrimaryDefault-dark': '#3D3D3D',
        borderPrimaryPress: '#767676',
        'borderPrimaryPress-dark': '#A3A3A3',
        borderSecondary: '#ededed',
        borderSecondaryDark: '#767676',
        'borderSecondary-dark': '#292929',
        borderSuccess: '#00847f',
        borderError: '#a8000b',
        'borderError-dark': '#EC656E',
        borderActionDefault: '#db0011',
        'borderActionDefault-dark': '#ED3535',
        borderActionPress: '#730014',
        borderInfo: '#305A85',
        'borderInfo-dark': '#6F9ECE',
        borderDisabled: '#BDBDBD',
        'borderDisabled-dark': '#575757',
        borderInvert: '#FFFFFF0F',

        // Pokémon palettes
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
          default: '#9b9ea1',
        },
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
          normal: '#7f8183',
        },
        gender: {
          female: '#ff66b9',
          male: '#369fff',
        },
      },
      fontSize: {
        fontSizeXs: '0.625rem', // 10px
        fontSizeS: '0.75rem', // 12px
        fontSizeM: '0.875rem', // 14px
        fontSizeL: '1rem', // 16px
        fontSizeXl: '1.125rem', // 18px
        fontSize2Xl: '1.250rem', // 20px
        fontSize3xl: '1.5rem', // 24px
        fontSize4xl: '2rem', // 32px
        fontSize5xl: '2.25rem', // 36px
      },
      lineHeight: {
        lineHeightXs: '1rem', // 16px
        lineHeightS: '1.125rem', // 18px
        lineHeightM: '1.25rem', // 20px
        lineHeightL: '1.5rem', // 24px
        lineHeightXl: '1.75rem', // 28px
        lineHeight2xl: '2rem', // 32px
        lineHeight3xl: '2.25rem', // 36px
        lineHeight4xl: '2.5rem', // 40px
        lineHeight5xl: '2.75rem', // 44px
      },
      boxShadow: {
        dropShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.16)',
        shadowHandle: '0px 4px 16px 0px rgba(54, 54, 54, 0.2)',
        shadowXs: '0px 0px 40px 0px rgba(54, 54, 54, 0.02)',
        shadowM: '0px 8px 40px 0px rgba(54, 54, 54, 0.08)',
      },
      fontFamily: {
        montserratRegular: ['MontserratRegular'],
        montserratSemiBold: ['MontserratSemiBold'],
        montserratBold: ['MontserratBold'],
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enables dark mode support
  safelist: [
    'bg-surfaceError',
    'bg-surfaceNeutral',
    'bg-surfaceInfo',
    'bg-surfaceWarning',
    'dark:bg-surfaceError-dark',
    'dark:bg-surfaceNeutral-dark',
    'text-textWhite',
    'text-textTertiary',
    'dark:text-textTetriary-dark',
    'bg-surfaceAction',
    'bg-surfaceAction-dark',
    'w-2',
    'h-2',
    'h-[8px]',
    'w-8px',
  ],
};
