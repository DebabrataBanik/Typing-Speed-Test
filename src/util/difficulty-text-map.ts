import json from '../data.json';
import type { Difficulty, TextItem } from '../types/project';

const data = json as Record<Difficulty, TextItem[]>;

// Fisher-yates shuffle algo
function shuffleArray(arr: TextItem[]): TextItem[]{
  for(let i=arr.length-1; i>0; i--){
    const rndm = Math.floor(Math.random() * (i+1));
    [arr[i], arr[rndm]] = [arr[rndm], arr[i]]
  }
  return arr
}

export function getTextContent(level: Difficulty): TextItem{
  const textArr = shuffleArray(data[level])

  return textArr[0]
}