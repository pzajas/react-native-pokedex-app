import { ImageSourcePropType } from 'react-native'

type PokemonType =
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy'
  | 'normal'

export const pokemonTypeIcons: Record<PokemonType, ImageSourcePropType> = {
  fire: require('../../assets/icons/FireIcon.png'),
  water: require('../../assets/icons/WaterIcon.png'),
  grass: require('../../assets/icons/GrassIcon.png'),
  electric: require('../../assets/icons/ElectricIcon.png'),
  ice: require('../../assets/icons/IceIcon.png'),
  bug: require('../../assets/icons/BugIcon.png'),
  fighting: require('../../assets/icons/FightingIcon.png'),
  poison: require('../../assets/icons/PoisonIcon.png'),
  ground: require('../../assets/icons/GroundIcon.png'),
  flying: require('../../assets/icons/FlyingIcon.png'),
  psychic: require('../../assets/icons/PsychicIcon.png'),
  rock: require('../../assets/icons/RockIcon.png'),
  ghost: require('../../assets/icons/GhostIcon.png'),
  dragon: require('../../assets/icons/DragonIcon.png'),
  dark: require('../../assets/icons/DarkIcon.png'),
  steel: require('../../assets/icons/SteelIcon.png'),
  fairy: require('../../assets/icons/FairyIcon.png'),
  normal: require('../../assets/icons/NormalIcon.png')
}
