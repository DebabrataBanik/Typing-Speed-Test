export type Difficulty = 'easy' | 'medium' | 'hard';
export type Mode = 'timed' | 'passage';

export interface TextItem{
  id: string;
  text: string;
}

export interface Result{
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  wpm: number;
  timestamp: number
}
