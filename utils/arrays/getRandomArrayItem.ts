export const getRandomItem = (array: string[]) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}
