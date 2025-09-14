import { pokeApi } from '@/api';
import { ThemedText } from '@/components/typography/ThemedText';
import { usePokemonDetails } from '@/hooks/pokemon';
import { useQuery } from '@tanstack/react-query';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

function cleanGenus(genus?: string | null) {
  if (!genus) return null;
  return genus.replace(/\s*Pok[eé]mon\s*$/i, '');
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

function capitalize(s?: string) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function padId(id?: number) {
  if (!id && id !== 0) return '#—';
  return `#${String(id).padStart(3, '0')}`;
}

function dmToFeetInches(dm?: number) {
  if (!dm && dm !== 0) return { feet: null, inches: null, cm: null };
  const cm = dm * 10;
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches - feet * 12);
  return { feet, inches, cm: Math.round(cm) };
}

function hgToLbsKg(hg?: number) {
  if (!hg && hg !== 0) return { lbs: null, kg: null };
  const kg = hg / 10;
  const lbs = kg * 2.2046226218;
  return { lbs: Math.round(lbs * 10) / 10, kg: Math.round(kg * 10) / 10 };
}

function statDisplayName(statName: string) {
  const map: Record<string, string> = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed',
  };
  return map[statName] ?? capitalize(statName.replace(/-/g, ' '));
}

function getEvYield(stats: any[]): string {
  const yields = (stats || [])
    .filter((s) => Number(s.effort) > 0)
    .map((s) => `${s.effort} ${statDisplayName(s.stat.name)}`);
  return yields.length ? yields.join(', ') : '—';
}

function captureRatePercent(captureRate?: number): number | null {
  if (typeof captureRate !== 'number') return null;
  return Math.round((captureRate / 255) * 100 * 10) / 10; // approx with PokéBall, full HP
}

function labelGrowthRate(name?: string | null) {
  if (!name) return '—';
  return name.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function labelFriendship(n?: number) {
  if (typeof n !== 'number') return '—';
  const suffix = n === 70 ? ' (normal)' : '';
  return `${n}${suffix}`;
}

function eggStepRange(hatchCounter?: number) {
  if (typeof hatchCounter !== 'number') return null;
  const min = hatchCounter * 255;
  const max = hatchCounter * 257;
  return { min, max };
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

  const details = detailsQuery.data as any;
  const species = speciesQuery.data;
  const evolution = evolutionQuery.data;

  const [activeTab, setActiveTab] = React.useState<'About' | 'Base Stats' | 'Evolution' | 'Moves'>(
    'About',
  );

  console.log(details);

  const types = details?.types?.map((t: any) => t.type.name) ?? [];
  const abilities =
    details?.abilities?.map((a: any) => `${a.ability.name}${a.is_hidden ? ' (hidden)' : ''}`) ?? [];
  const stats = details?.stats ?? [];
  const genus = getEnglishGenus(species);
  const cleaned = cleanGenus(genus || undefined);
  const flavor = getLatestEnglishFlavor(species);
  const gender = percentFromGenderRate(species?.gender_rate ?? -1);
  const malePct = typeof gender.male === 'number' ? gender.male : 0;
  const femalePct = typeof gender.female === 'number' ? gender.female : 0;
  const eggGroups = species?.egg_groups?.map((g) => g.name) ?? [];
  const evolutionNames = flattenEvolutionNames(evolution?.chain);
  const height = dmToFeetInches(details?.height);
  const weight = hgToLbsKg(details?.weight);
  const artwork =
    details?.sprites?.other?.['official-artwork']?.front_default || details?.sprites?.front_default;
  const evYield = getEvYield(stats);
  const catchPct = captureRatePercent(species?.capture_rate);
  const stepRange = eggStepRange(species?.hatch_counter);

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
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      {/* Header with Safe Area */}
      <SafeAreaView edges={['top']} className="bg-[#2ec4b6] dark:bg-[#2ec4b6] rounded-b-[24px]">
        <View className="px-4 pt-2 pb-6">
          <View className="flex-row justify-between items-center">
            <ThemedText weight="bold" className="text-[28px] text-white">
              {capitalize(details.name)}
            </ThemedText>
            <ThemedText weight="bold" className="text-[16px] text-white/90">
              {padId(details.id)}
            </ThemedText>
          </View>
          <View className="flex-row gap-2 mt-2">
            {types.map((t: string) => (
              <View key={t} className="px-3 py-1 rounded-full bg-white/20">
                <ThemedText weight="medium" className="text-white text-[12px]">
                  {capitalize(t)}
                </ThemedText>
              </View>
            ))}
          </View>
          {!!artwork && (
            <View className="self-center mt-4">
              <Image
                source={{ uri: artwork }}
                style={{ width: 200, height: 200 }}
                contentFit="contain"
              />
            </View>
          )}
        </View>
      </SafeAreaView>

      {/* Tabs */}
      <View className="px-4 mt-4">
        <View className="flex-row justify-between">
          {(['About', 'Base Stats', 'Evolution', 'Moves'] as const).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              className="flex-1 items-center pb-2"
            >
              <ThemedText
                weight={activeTab === tab ? 'bold' : 'regular'}
                className={
                  activeTab === tab
                    ? 'text-textPrimary dark:text-textPrimary-dark'
                    : 'text-iconDefault dark:text-iconDefault-dark'
                }
              >
                {tab}
              </ThemedText>
              {activeTab === tab ? (
                <View className="h-[2px] bg-[#2ec4b6] w-full mt-1" />
              ) : (
                <View className="h-[2px] bg-transparent w-full mt-1" />
              )}
            </Pressable>
          ))}
        </View>
      </View>

      {/* Content */}
      <View className="px-4 mt-2">
        {activeTab === 'About' && (
          <View>
            {/* Description */}
            <ThemedText weight="bold" className="mt-2">
              Description
            </ThemedText>
            <View className="h-[1px] bg-[#e5e7eb] dark:bg-[#333] my-2" />
            {!!flavor && <ThemedText>{flavor}</ThemedText>}

            {/* Pokédex Data */}
            <ThemedText weight="bold" className="mt-6">
              Pokédex Data
            </ThemedText>
            <View className="h-[1px] bg-[#e5e7eb] dark:bg-[#333] my-2" />
            <View className="flex-row gap-4">
              <View className="flex-1">
                {!!cleaned && <ThemedText>Species: {cleaned}</ThemedText>}
              </View>
              <View className="flex-1">
                <ThemedText>
                  Habitat: {species?.habitat?.name ? capitalize(species.habitat.name) : '—'}
                </ThemedText>
              </View>
            </View>
            <View className="flex-row gap-4 mt-1">
              <View className="flex-1">
                <ThemedText>
                  Height:{' '}
                  {height.feet !== null
                    ? `${height.feet}'${height.inches}\" (${height.cm} cm)`
                    : '—'}
                </ThemedText>
              </View>
              <View className="flex-1">
                <ThemedText>
                  Weight: {weight.lbs !== null ? `${weight.lbs} lbs (${weight.kg} kg)` : '—'}
                </ThemedText>
              </View>
            </View>

            {/* Training */}
            <ThemedText weight="bold" className="mt-6">
              Training
            </ThemedText>
            <View className="h-[1px] bg-[#e5e7eb] dark:bg-[#333] my-2" />
            <View className="flex-row gap-4">
              <View className="flex-1">
                <ThemedText>
                  Catch Rate: {typeof catchPct === 'number' ? `${catchPct}%` : '—'}
                </ThemedText>
              </View>
              <View className="flex-1">
                <ThemedText>EV Yield: {evYield}</ThemedText>
              </View>
            </View>
            <View className="flex-row gap-4 mt-1">
              <View className="flex-1">
                <ThemedText>Friendship: {labelFriendship(species?.base_happiness)}</ThemedText>
              </View>
              <View className="flex-1">
                <ThemedText>Experience: {String(details?.base_experience ?? '—')}</ThemedText>
              </View>
            </View>

            {/* Breeding */}
            <ThemedText weight="bold" className="mt-6">
              Breeding
            </ThemedText>
            <View className="h-[1px] bg-[#e5e7eb] dark:bg-[#333] my-2" />
            {/* Gender bar */}
            {gender.genderless ? (
              <ThemedText>Gender: Genderless</ThemedText>
            ) : (
              <View>
                <View
                  className="h-[12px] w-full bg-[#e5e7eb] dark:bg-[#333] rounded-full overflow-hidden"
                  style={{ position: 'relative' }}
                >
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: (malePct + '%') as any,
                      backgroundColor: '#369fff',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      bottom: 0,
                      width: (femalePct + '%') as any,
                      backgroundColor: '#ff66b9',
                    }}
                  />
                </View>
                <View className="flex-row justify-between mt-1">
                  <ThemedText>♂ {malePct}%</ThemedText>
                  <ThemedText>♀ {femalePct}%</ThemedText>
                </View>
              </View>
            )}
            <View className="mt-2">
              <ThemedText>Growth Rate: {labelGrowthRate(species?.growth_rate?.name)}</ThemedText>
              <ThemedText>Egg Group: {eggGroups.length ? eggGroups[0] : '—'}</ThemedText>
            </View>
          </View>
        )}

        {activeTab === 'Base Stats' && (
          <View className="mt-2">
            {stats.map((s: any) => {
              const value = s.base_stat as number;
              const pct = Math.min(100, Math.round((value / 255) * 100));
              return (
                <View key={s.stat.name} className="mb-3">
                  <ThemedText>
                    {statDisplayName(s.stat.name)}: {value}
                  </ThemedText>
                  <View className="h-[8px] bg-[#e5e7eb] dark:bg-[#333] rounded-full overflow-hidden mt-1">
                    <View style={{ width: `${pct}%` }} className="h-full bg-[#2ec4b6]" />
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {activeTab === 'Evolution' && (
          <View className="mt-2">
            {evolutionNames.length ? (
              <ThemedText>{evolutionNames.map(capitalize).join(' → ')}</ThemedText>
            ) : (
              <ThemedText>—</ThemedText>
            )}
          </View>
        )}

        {activeTab === 'Moves' && (
          <View className="mt-2">
            {(details?.moves ?? []).slice(0, 50).map((m: any) => (
              <ThemedText key={m.move.name}>{capitalize(m.move.name)}</ThemedText>
            ))}
            {(details?.moves ?? []).length > 50 && (
              <ThemedText className="mt-2">
                …and more ({details.moves.length - 50} hidden)
              </ThemedText>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
