import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SearchState {
  query: string;
  setQuery: (q: string) => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      query: '',
      setQuery: (q) => set({ query: q }),
    }),
    {
      name: 'search-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
