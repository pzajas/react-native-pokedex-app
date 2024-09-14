import { formatText } from '../formatters/formatTextString'

import _ from 'lodash'

interface Description {
  flavor_text: string
}

export const getRandomDescription = (desc: Description[]): string => {
  if (desc && desc.length > 0) {
    const shuffledDesc = _.shuffle(desc)
    const randomEntry = shuffledDesc[0]
    return formatText(randomEntry.flavor_text)
  }
  return 'No description available.'
}
