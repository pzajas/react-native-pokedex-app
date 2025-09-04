export type TileLabel = 'Pokedex' | 'Characters' | 'Locations' | 'Items' | 'Moves' | 'Abilities';

export interface TileProps {
  label: TileLabel | string;
  onPress?: () => void;
}
