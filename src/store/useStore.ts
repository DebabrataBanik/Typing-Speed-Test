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
  timer: number;
  setTimer: (value: number | ((prev: number) => number)) => void;
  accuracy: number;
  setAccuracy: (value: number) => void;
  wpm: number;
  setWpm: (value: number) => void;
  correctChars: number;
  setCorrectChars: (value: number) => void;
  incorrectChars: number;
  setIncorrectChars: (value: number) => void;
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
  setBestScore: (value) => set({ bestScore: value }),

  timer: 60,
  setTimer: (value) => set((state) => ({ timer: typeof value === 'function' ? value(state.timer) : value })),

  accuracy: 100,
  setAccuracy: (value) => set({ accuracy: value }),

  wpm: 0,
  setWpm: (value) => set({ wpm: value }),

  correctChars: 0,
  setCorrectChars: (value) => set({ correctChars: value }),

  incorrectChars: 0,
  setIncorrectChars: (value) => set({ incorrectChars: value })

}))