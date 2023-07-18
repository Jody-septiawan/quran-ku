import { create } from "zustand";

import type { GoogleUserInfo } from "@/types";

type Store = {
  googleUserInfo: GoogleUserInfo | null;
  setGoogleUserInfo: (googleUserInfo: GoogleUserInfo | null) => void;
};

export const useUserStore = create<Store>()((set) => ({
  googleUserInfo: null,
  setGoogleUserInfo: (googleUserInfo: GoogleUserInfo | null) =>
    set(() => ({ googleUserInfo })),
}));
