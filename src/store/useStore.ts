import { create } from "zustand";

type Store = {
  isStarted: boolean;
  setIsStarted: (value: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  isStarted: false,
  setIsStarted: (value) => set({ isStarted: value })
}))