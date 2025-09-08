import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FavoritesState {
  favorites: Set<number>;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<number>(),
      toggleFavorite: (id) =>
        set((state) => {
          const next = new Set(state.favorites);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          return { favorites: next } as FavoritesState;
        }),
      isFavorite: (id) => get().favorites.has(id),
    }),
    {
      name: 'favorites-store',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      // Serialize Set for persistence
      partialize: (state) => ({ favorites: Array.from(state.favorites) as any }),
      merge: (persisted: any, current) => ({
        ...current,
        favorites: new Set<number>(persisted?.favorites ?? []),
      }),
    },
  ),
);
