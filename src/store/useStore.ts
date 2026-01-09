import { create } from "zustand";
import type { Difficulty, Mode } from "../types/project";

type Store = {
  level: Difficulty;
  setLevel: (value: Difficulty) => void; 
  mode: Mode;
  setMode: (value: Mode) => void;
  isStarted: boolean;
  setIsStarted: (value: boolean) => void;
  testCompleted: boolean;
  setTestCompleted: (value: boolean) => void;
  bestScore: number | null;
  setBestScore: (value: number | null) => void;
}

export const useStore = create<Store>((set) => ({
  level: 'easy',
  setLevel: (value) => set({ level: value }),

  mode: 'timed',
  setMode: (value) => set({ mode: value }),

  isStarted: false,
  setIsStarted: (value) => set({ isStarted: value }),

  testCompleted: false,
  setTestCompleted: (value) => set({ testCompleted: value }),
  
  bestScore: null,
  setBestScore: (value) => set({ bestScore: value}) 
}))