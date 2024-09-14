import { tabLabels } from '@/constants/tabs'

import { About } from './about/About'
import { Evolution } from './evolution/Evolution'
import { Moves } from './moves/Moves'
import { Stats } from './stats/Stats'

export const tabs = [
  { label: tabLabels.about, component: <About /> },
  { label: tabLabels.stats, component: <Stats /> },
  { label: tabLabels.evolution, component: <Evolution /> },
  { label: tabLabels.moves, component: <Moves /> }
]
