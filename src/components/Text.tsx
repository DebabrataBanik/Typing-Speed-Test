import { useCallback, useMemo, useEffect, useState } from 'react';
import type { Difficulty, TextItem } from '../types/project'
import { getTextContent } from '../util/difficulty-text-map';
import Overlay from './Overlay';
import { useStore } from '../store/useStore';

interface TextProps{
  difficulty: Difficulty;
}

const Text = ({difficulty}: TextProps) => {

  const [passage, setPassage] = useState<TextItem>(() => getTextContent(difficulty));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const { isStarted, setIsStarted } = useStore();

  useEffect(() => {
    setCurrentIdx(0)
    setUserInputs([])
    setPassage(getTextContent(difficulty));
  }, [difficulty])

  // useCallback ensures referential stability for its cleanup
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === 'Backspace'){
      setCurrentIdx(prev => prev > 0 ? prev-1 : prev)
      setUserInputs(prev => prev.slice(0, -1))
      return
    }
    if(e.key.length !== 1) return
    
    setIsStarted(true)
    setUserInputs(prev => [...prev, e.key])
    setCurrentIdx(prev => prev + 1)
  }, [setIsStarted])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // console.log(userInputs)
  // console.log(currentIdx)

  const charArr = useMemo(() => 
    passage.text.split('').map(char => char === '—' ? '-' : char)
    ,[passage]
  ) 

  // const words = passage.text.split(' ');
  return (
    <section className='text-wrapper'>
      <div className={!isStarted ? 'layer' : ''}>
        <p className='text'>
          {/* this represents all chars separate */}
          {
            charArr.map((char, index) => {
              const isCurrent = currentIdx === index;
              const isCorrect = userInputs[index] === charArr[index] 

              return (
                <span 
                  key={`${char}-${index}`}
                  className={`
                    ${isCurrent ? 'active' : ''}
                    ${currentIdx > index && isCorrect ? 'correct' : ''}
                    ${currentIdx > index && !isCorrect ? 'incorrect' : ''}
                  `}
                >
                  {char}
                </span>
            )})
          }
        </p>
      </div>
      {
        !isStarted && <Overlay />
      }
    </section>
  )
}

export default Text