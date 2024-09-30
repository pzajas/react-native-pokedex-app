import { About } from './about/About'
import { Evolutions } from './evolutions/Evolutions'
import { Moves } from './moves/Moves'
import { Stats } from './stats/Stats'

import { pokemonTabLabels } from '@/constants/pokemons'
import { PokeTabWrapper } from './PokeTabWrapper'
import { Media } from './media/Media'

export const tabs = [
  {
    label: pokemonTabLabels.about,
    component: (
      <PokeTabWrapper>
        <About />
      </PokeTabWrapper>
    )
  },
  {
    label: pokemonTabLabels.stats,
    component: (
      <PokeTabWrapper>
        <Stats />
      </PokeTabWrapper>
    )
  },
  {
    label: pokemonTabLabels.moves,
    component: (
      <PokeTabWrapper>
        <Moves />
      </PokeTabWrapper>
    )
  },
  {
    label: pokemonTabLabels.evolution,
    component: (
      <PokeTabWrapper>
        <Evolutions />
      </PokeTabWrapper>
    )
  },
  {
    label: pokemonTabLabels.media,
    component: (
      <PokeTabWrapper>
        <Media />
      </PokeTabWrapper>
    )
  }
]
