export const getGenderRate = (genderRate: number | undefined) => {
  try {
    let malePercentage, femalePercentage

    if (genderRate !== undefined && genderRate !== -1) {
      if (typeof genderRate !== 'number' || genderRate < 0 || genderRate > 8) {
        throw new Error('Invalid genderRate value')
      }

      femalePercentage = genderRate * 12.5
      malePercentage = (8 - genderRate) * 12.5
    } else {
      malePercentage = 0
      femalePercentage = 0
    }

    return { malePercentage, femalePercentage }
  } catch (error) {
    console.error('Error calculating gender rates:', error)
    return { malePercentage: 0, femalePercentage: 0 }
  }
}
