import { ThemedText } from '@/components/typography/ThemedText';
import { usePokemonDetails, usePokemonIndex, usePokemonList } from '@/hooks/pokemon';
import { SearchSection } from '@/screens/Home/search/SearchSection';
import { useSearchStore } from '@/store/useSearchStore';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Image as RNImage, View } from 'react-native';

// Static map for type icons (RN requires static requires)
const typeIcons: Record<string, any> = {
  bug: require('../../assets/icons/BugIcon.png'),
  dark: require('../../assets/icons/DarkIcon.png'),
  dragon: require('../../assets/icons/DragonIcon.png'),
  electric: require('../../assets/icons/ElectricIcon.png'),
  fairy: require('../../assets/icons/FairyIcon.png'),
  fighting: require('../../assets/icons/FightingIcon.png'),
  fire: require('../../assets/icons/FireIcon.png'),
  flying: require('../../assets/icons/FlyingIcon.png'),
  ghost: require('../../assets/icons/GhostIcon.png'),
  grass: require('../../assets/icons/GrassIcon.png'),
  ground: require('../../assets/icons/GroundIcon.png'),
  ice: require('../../assets/icons/IceIcon.png'),
  normal: require('../../assets/icons/NormalIcon.png'),
  poison: require('../../assets/icons/PoisonIcon.png'),
  psychic: require('../../assets/icons/PsychicIcon.png'),
  rock: require('../../assets/icons/RockIcon.png'),
  steel: require('../../assets/icons/SteelIcon.png'),
  water: require('../../assets/icons/WaterIcon.png'),
};

// Color palettes (match tailwind config values)
const TYPE_COLORS: Record<string, string> = {
  fire: '#fba64a',
  water: '#5face2',
  grass: '#5dc067',
  electric: '#F4D23C',
  ice: '#7bd3c6',
  fighting: '#d7425a',
  poison: '#b363cd',
  ground: '#d58858',
  flying: '#95addf',
  psychic: '#f87c7a',
  bug: '#aac634',
  rock: '#cabb8a',
  ghost: '#5c6cb8',
  dragon: '#0970c8',
  dark: '#818796',
  steel: '#5599a5',
  fairy: '#ee92e6',
  default: '#9b9ea1',
  normal: '#7f8183',
};
const CHIP_COLORS: Record<string, string> = {
  fire: '#e28c3f',
  water: '#4e98c4',
  grass: '#4da055',
  electric: '#d7bf4c',
  ice: '#6ab1a8',
  fighting: '#b83648',
  poison: '#944ba9',
  ground: '#b96f48',
  flying: '#7890bf',
  psychic: '#d26766',
  bug: '#8f9f2c',
  rock: '#a89572',
  ghost: '#4b579b',
  dragon: '#085c9f',
  dark: '#6d707c',
  steel: '#467d89',
  fairy: '#cc7cc2',
  normal: '#7f8183',
};

const formatId = (id: number) => `#${id.toString().padStart(3, '0')}`;
const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
const parseIdFromUrl = (url: string) => {
  const m = url.match(/\/pokemon\/(\d+)\/?$/);
  return m ? Number(m[1]) : NaN;
};

export const PokedexScreen = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = usePokemonList();
  const indexQuery = usePokemonIndex();

  const query = useSearchStore((s) => s.query);
  const setQuery = useSearchStore((s) => s.setQuery);

  const [debounced, setDebounced] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 400);
    return () => clearTimeout(t);
  }, [query]);

  const baseItems = useMemo(() => {
    const all = data?.pages.flatMap((p) => p.results) ?? [];
    return all.filter((i) => {
      const id = parseIdFromUrl(i.url);
      return !Number.isNaN(id) && id < 10000;
    });
  }, [data]);

  const searchItems = useMemo(() => {
    if (!indexQuery.data) return [];
    const q = debounced.trim().toLowerCase();
    if (q.length === 0) return [];
    const isNum = /^\d+$/.test(q);
    return indexQuery.data.filter((i) => {
      const id = parseIdFromUrl(i.url);
      if (Number.isNaN(id) || id >= 10000) return false;
      return isNum ? id === Number(q) : i.name.includes(q);
    });
  }, [debounced, indexQuery.data]);

  const showingSearch = debounced.trim().length > 0;
  const items = showingSearch ? searchItems : baseItems;

  useEffect(() => {
    if (items.length > 0) {
      console.log('First pokemon item:', items[0]);
    }
  }, [items]);

  const onEndReached = useCallback(() => {
    if (!showingSearch && hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [showingSearch, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surfaceSecondary dark:bg-surfaceSecondary-dark">
      <FlatList
        data={items}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PokemonRow name={item.name} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.6}
        ListHeaderComponent={<SearchSection value={query} onChangeText={setQuery} />}
        ListFooterComponent={
          !showingSearch && isFetchingNextPage ? (
            <View className="py-4">
              <ActivityIndicator />
            </View>
          ) : null
        }
        contentContainerStyle={{ paddingVertical: 8 }}
      />
    </View>
  );
};

const PokemonRow = ({ name }: { name: string }) => {
  const router = useRouter();
  const { data, isLoading } = usePokemonDetails(name, Boolean(name));
  const [imgLoading, setImgLoading] = useState(true);

  const onPress = useCallback(() => {
    router.push({ pathname: '/(content)/pokedex/[name]', params: { name } });
  }, [router, name]);

  if (isLoading || !data) {
    return (
      <View className="px-4 py-3">
        <Pressable
          onPress={onPress}
          className="flex-row gap-3 items-center p-3 rounded-3xl border border-black"
          style={{
            backgroundColor: '#ededed',
            shadowColor: '#000',
            shadowOpacity: 0.15,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          {/* Gloss overlay */}
          <View className="absolute inset-0 rounded-3xl overflow-hidden">
            <LinearGradient
              colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0)']}
              locations={[0, 0.35, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ position: 'absolute', inset: 0 }}
            />
          </View>
          <View className="flex-1 h-[88px] justify-between">
            <ThemedText className="text-[10px] text-white">{formatId(0)}</ThemedText>
            <ThemedText weight="bold" className="text-[18px]">
              {capitalize(name)}
            </ThemedText>
            <View className="flex-row gap-2">
              <ThemedText className="text-[13px]" color="icon">
                Loading…
              </ThemedText>
            </View>
          </View>
          <View className="w-[88px] h-[88px] items-center justify-center rounded-[12px] overflow-hidden">
            <ActivityIndicator />
          </View>
        </Pressable>
      </View>
    );
  }

  const img =
    data.sprites?.other?.dream_world?.front_default ||
    data.sprites?.other?.['official-artwork']?.front_default ||
    data.sprites?.other?.home?.front_default ||
    data.sprites?.front_default ||
    undefined;

  const primaryType = data.types[0]?.type.name.toLowerCase();
  const tileHex = TYPE_COLORS[primaryType] ?? TYPE_COLORS.default;

  return (
    <View className="px-4 py-3">
      <Pressable
        onPress={onPress}
        className={`flex-row gap-3 items-center p-3 rounded-3xl border border-black`}
        style={{
          backgroundColor: tileHex,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 8,
          elevation: 5,
        }}
      >
        {/* Gloss overlay */}
        <View className="absolute inset-0 rounded-3xl overflow-hidden">
          <LinearGradient
            colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.08)', 'rgba(255,255,255,0)']}
            locations={[0, 0.35, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: 'absolute', inset: 0 }}
          />
        </View>
        {/* Left column: ID top, name middle, types bottom */}
        <View className="flex-1 h-[88px] justify-between">
          <ThemedText className="text-[12px] text-white">{formatId(data.id)}</ThemedText>
          <ThemedText weight="bold" className="text-[18px]">
            {capitalize(data.name)}
          </ThemedText>
          <View className="flex-row flex-wrap gap-2">
            {data.types.map((t) => {
              const type = t.type.name.toLowerCase();
              const icon = typeIcons[type];
              const chipHex = CHIP_COLORS[type] ?? CHIP_COLORS.normal;
              return (
                <View
                  key={type}
                  className={`flex-row justify-center items-center rounded-full`}
                  style={{ backgroundColor: chipHex, width: 30, height: 30 }}
                >
                  {icon ? <RNImage source={icon} style={{ width: 40, height: 40 }} /> : null}
                </View>
              );
            })}
          </View>
        </View>

        {/* Right column: artwork (spinner while loading) */}
        <View className="w-[88px] h-[88px] items-center justify-center rounded-[12px]">
          {imgLoading && <ActivityIndicator style={{ position: 'absolute' }} />}
          {img ? (
            <Image
              source={{ uri: img }}
              style={{ width: 120, height: 120, marginTop: -20, marginLeft: -40 }}
              contentFit="contain"
              cachePolicy="disk"
              transition={200}
              onLoadStart={() => setImgLoading(true)}
              onLoadEnd={() => setImgLoading(false)}
            />
          ) : (
            <ThemedText className="text-[12px]" color="icon">
              No Image
            </ThemedText>
          )}
        </View>
      </Pressable>
    </View>
  );
};
