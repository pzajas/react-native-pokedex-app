export const formatPokemonId = (id?: string | null): string => {
  return id?.toString().padStart(3, '0') ?? '000'
}
