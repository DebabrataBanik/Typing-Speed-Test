import { useCallback, useEffect, useState } from 'react';
import type { Difficulty, TextItem } from '../types/project'
import { getTextContent } from '../util/difficulty-text-map';

interface TextProps{
  difficulty: Difficulty;
}

const Text = ({difficulty}: TextProps) => {

  const [passage, setPassage] = useState<TextItem>(() => getTextContent(difficulty));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);

  useEffect(() => {
    setPassage(getTextContent(difficulty));
  }, [difficulty])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === 'Backspace'){
      setCurrentIdx(prev => prev > 0 ? prev-1 : prev)
      setUserInputs(prev => prev.slice(0, -1))
      return
    }
    if(e.key.length !== 1) return

    setUserInputs(prev => [...prev, e.key])
    setCurrentIdx(prev => prev + 1)
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  console.log(userInputs)

  const charArr = passage.text.split('')

  // const words = passage.text.split(' ');
  return (
    <section className='text-wrapper'>
      <p className='text'>
        {/* this keeps the words intact */}
        {/* {
          words.map((word, wordIndex) => (
            <span key={`${word}-${wordIndex}`}>
              {
                word.split('').map((char, charIndex) => (
                  <span key={`${word}-${charIndex}`}>
                    {char}
                  </span>
                ))
              }
              {
                <span> </span>
              }
            </span>
          ))
        } */}
        {/* this represents all chars separate */}
        {
          charArr.map((char, index) => (
            <span 
              key={`${char}-${index}`}
              className={
                currentIdx === index ? 'active' : 
                currentIdx > index && charArr[index] === userInputs[index] ? 'correct' : 
                currentIdx > index && charArr[index] != userInputs[index] ? 'incorrect' : ''
              }
            >
              {char}
            </span>
          ))
        }
      </p>
    </section>
  )
}

export default Text