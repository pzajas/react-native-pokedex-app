import { pokeApi } from '@/api';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const PAGE_SIZE = 40;

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export const usePokemonList = () => {
  return useInfiniteQuery<PokemonListResponse, Error>({
    queryKey: ['pokemon', 'list'],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = Number(pageParam) || 0;
      const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon`, {
        params: { limit: PAGE_SIZE, offset },
      });
      return data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.reduce((acc, p) => acc + p.results.length, 0);
      if (lastPage.next === null) return undefined;
      return fetched; // next offset
    },
    staleTime: 60 * 1000,
  });
};

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: any;
  types: { slot: number; type: { name: string; url: string } }[];
}

export const usePokemonDetails = (nameOrId: string | number, enabled = true) => {
  return useQuery<PokemonDetails, Error>({
    queryKey: ['pokemon', 'details', nameOrId],
    queryFn: async () => {
      const { data } = await pokeApi.get<PokemonDetails>(`/pokemon/${nameOrId}`);
      return data;
    },
    enabled,
    staleTime: 60 * 1000,
  });
};

export const usePokemonIndex = () => {
  return useQuery<PokemonListItem[], Error>({
    queryKey: ['pokemon', 'index'],
    queryFn: async () => {
      // First request to learn total count
      const first = await pokeApi.get<PokemonListResponse>('/pokemon', {
        params: { limit: 1, offset: 0 },
      });
      const total = first.data.count;
      const { data } = await pokeApi.get<PokemonListResponse>('/pokemon', {
        params: { limit: total, offset: 0 },
      });
      return data.results;
    },
    staleTime: 24 * 60 * 60 * 1000, // 24h
    gcTime: 24 * 60 * 60 * 1000,
  });
};
