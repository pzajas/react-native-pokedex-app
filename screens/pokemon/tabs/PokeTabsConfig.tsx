import { tabLabels } from '@/constants/tabs'

import { About } from './about/About'
import { Evolutions } from './evolutions/Evolutions'
import { Moves } from './moves/Moves'
import { Stats } from './stats/Stats'

import { PokeTabWrapper } from './PokeTabWrapper'

export const tabs = [
  {
    label: tabLabels.about,
    component: (
      <PokeTabWrapper>
        <About />
      </PokeTabWrapper>
    )
  },
  {
    label: tabLabels.stats,
    component: (
      <PokeTabWrapper>
        <Stats />
      </PokeTabWrapper>
    )
  },
  {
    label: tabLabels.moves,
    component: (
      <PokeTabWrapper>
        <Moves />
      </PokeTabWrapper>
    )
  },
  {
    label: tabLabels.evolution,
    component: (
      <PokeTabWrapper>
        <Evolutions />
      </PokeTabWrapper>
    )
  }
]
