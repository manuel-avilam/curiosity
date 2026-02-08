import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface DataState {
  likedFacts: string[];
  history: string[];

  toggleLike: (factId: string) => void;
  addToHistory: (factId: string) => void;
  clearHistory: () => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set) => ({
      likedFacts: [],
      history: [],

      toggleLike: (id) =>
        set((state) => ({
          likedFacts: state.likedFacts.includes(id)
            ? state.likedFacts.filter((factId) => factId !== id)
            : [...state.likedFacts, id],
        })),

      addToHistory: (id) =>
        set((state) => {
          const filtered = state.history.filter((fid) => fid !== id);
          return { history: [id, ...filtered].slice(0, 50) };
        }),

      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "curiosity-data-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
