import { pokeApi } from '@/api';
import { ThemedText } from '@/components/typography/ThemedText';
import { usePokemonDetails } from '@/hooks/pokemon';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

interface PokemonSpeciesResponse {
  evolution_chain: { url: string };
  genera: { genus: string; language: { name: string } }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  gender_rate: number; // 0..8, -1 -> genderless
  egg_groups: { name: string; url: string }[];
  hatch_counter: number;
  base_happiness: number;
  capture_rate: number;
  growth_rate: { name: string };
  has_gender_differences: boolean;
  color: { name: string } | null;
  shape: { name: string } | null;
  habitat: { name: string } | null;
  generation: { name: string } | null;
}

interface EvolutionChainResponse {
  chain: {
    species: { name: string };
    evolves_to: EvolutionChainResponse['chain'][];
  };
}

function getEnglishGenus(species?: PokemonSpeciesResponse) {
  return species?.genera?.find((g) => g.language.name === 'en')?.genus ?? null;
}

function getLatestEnglishFlavor(species?: PokemonSpeciesResponse) {
  const entries = species?.flavor_text_entries?.filter((e) => e.language.name === 'en') ?? [];
  return entries.length ? entries[entries.length - 1].flavor_text.replace(/\s+/g, ' ') : null;
}

function percentFromGenderRate(genderRate: number) {
  if (genderRate === -1) {
    return { male: null, female: null, genderless: 100 };
  }
  const female = (genderRate / 8) * 100;
  const male = ((8 - genderRate) / 8) * 100;
  return { male, female, genderless: 0 };
}

function flattenEvolutionNames(node?: EvolutionChainResponse['chain']): string[] {
  if (!node) return [];
  const children = node.evolves_to ?? [];
  return [node.species.name, ...children.flatMap((c) => flattenEvolutionNames(c))];
}

export default function PokemonDetailScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  const detailsQuery = usePokemonDetails(name as string, Boolean(name));

  const speciesQuery = useQuery<PokemonSpeciesResponse, Error>({
    queryKey: ['pokemon', 'species', name],
    queryFn: async () => {
      const { data } = await pokeApi.get<PokemonSpeciesResponse>(`/pokemon-species/${name}`);
      return data;
    },
    enabled: Boolean(name),
    staleTime: 60 * 1000,
  });

  const evolutionQuery = useQuery<EvolutionChainResponse, Error>({
    queryKey: ['pokemon', 'evolution', name, speciesQuery.data?.evolution_chain?.url],
    queryFn: async () => {
      if (!speciesQuery.data?.evolution_chain?.url) throw new Error('No evolution chain');
      const { data } = await pokeApi.get<EvolutionChainResponse>(
        speciesQuery.data.evolution_chain.url,
      );
      return data;
    },
    enabled: Boolean(speciesQuery.data?.evolution_chain?.url),
    staleTime: 60 * 1000,
  });

  const isLoading = detailsQuery.isLoading || speciesQuery.isLoading || evolutionQuery.isLoading;
  const isError = detailsQuery.isError || speciesQuery.isError || evolutionQuery.isError;

  const details = detailsQuery.data;
  const species = speciesQuery.data;
  const evolution = evolutionQuery.data;

  const types = details?.types?.map((t) => t.type.name).join(', ');
  const abilities = (details as any)?.abilities
    ?.map((a: any) => `${a.ability.name}${a.is_hidden ? ' (hidden)' : ''}`)
    .join(', ');
  const stats = (details as any)?.stats
    ?.map((s: any) => `${s.stat.name}: ${s.base_stat}`)
    .join(', ');

  const genus = getEnglishGenus(species);
  const flavor = getLatestEnglishFlavor(species);
  const gender = percentFromGenderRate(species?.gender_rate ?? -1);
  const eggGroups = species?.egg_groups?.map((g) => g.name).join(', ');
  const evolutionNames = flattenEvolutionNames(evolution?.chain).join(' → ');

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
        <ThemedText>Loading…</ThemedText>
      </View>
    );
  }

  if (isError || !details) {
    return (
      <View className="flex-1 justify-center items-center bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
        <ThemedText>Failed to load data.</ThemedText>
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark"
      contentContainerStyle={{ padding: 16 }}
    >
      <ThemedText weight="bold" className="text-[22px]">
        {details.name}
      </ThemedText>

      <ThemedText weight="bold" className="mt-4">
        Core
      </ThemedText>
      <ThemedText>ID: {String(details.id)}</ThemedText>
      <ThemedText>Types: {types || '—'}</ThemedText>
      <ThemedText>Height (dm): {String((details as any).height ?? '—')}</ThemedText>
      <ThemedText>Weight (hg): {String((details as any).weight ?? '—')}</ThemedText>
      <ThemedText>Base Experience: {String((details as any).base_experience ?? '—')}</ThemedText>
      <ThemedText>Abilities: {abilities || '—'}</ThemedText>
      <ThemedText>Stats: {stats || '—'}</ThemedText>
      <ThemedText>
        Sprite (official-artwork):{' '}
        {String((details as any).sprites?.other?.['official-artwork']?.front_default || '—')}
      </ThemedText>

      <ThemedText weight="bold" className="mt-4">
        Species
      </ThemedText>
      <ThemedText>Genus: {genus || '—'}</ThemedText>
      <ThemedText>Flavor: {flavor || '—'}</ThemedText>
      <ThemedText>
        Gender:{' '}
        {gender.genderless
          ? 'Genderless'
          : `♂ ${gender.male?.toFixed(1)}%  ♀ ${gender.female?.toFixed(1)}%`}
      </ThemedText>
      <ThemedText>Egg Groups: {eggGroups || '—'}</ThemedText>
      <ThemedText>Hatch Counter: {String(species?.hatch_counter ?? '—')}</ThemedText>
      <ThemedText>Base Happiness: {String(species?.base_happiness ?? '—')}</ThemedText>
      <ThemedText>Capture Rate: {String(species?.capture_rate ?? '—')}</ThemedText>
      <ThemedText>Growth Rate: {species?.growth_rate?.name || '—'}</ThemedText>
      <ThemedText>
        Has Gender Differences: {String(species?.has_gender_differences ?? '—')}
      </ThemedText>
      <ThemedText>Color: {species?.color?.name || '—'}</ThemedText>
      <ThemedText>Shape: {species?.shape?.name || '—'}</ThemedText>
      <ThemedText>Habitat: {species?.habitat?.name || '—'}</ThemedText>
      <ThemedText>Generation: {species?.generation?.name || '—'}</ThemedText>

      <ThemedText weight="bold" className="mt-4">
        Evolution
      </ThemedText>
      <ThemedText>{evolutionNames || '—'}</ThemedText>
    </ScrollView>
  );
}
