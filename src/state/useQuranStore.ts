import { create } from "zustand";

import type { Surah } from "@/types";

type Store = {
  surah: Surah[];
  setSurah: (surah: Surah[]) => void;
  surahDetail: Surah | null;
  setSurahDetail: (surahDetail: Surah | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  search: string | null;
  setSearch: (search: string | null) => void;
};

export const useQuranStore = create<Store>()((set) => ({
  surah: [],
  setSurah: (surah: Surah[]) => set(() => ({ surah })),
  surahDetail: null,
  setSurahDetail: (surahDetail: Surah | null) => set(() => ({ surahDetail })),
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  search: null,
  setSearch: (search: string | null) => set(() => ({ search })),
}));
