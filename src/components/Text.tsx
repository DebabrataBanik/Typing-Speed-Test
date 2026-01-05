import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
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
  const charRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    setCurrentIdx(0)
    setUserInputs([])
    setPassage(getTextContent(difficulty));
  }, [difficulty])

  const scrollIntoView = useCallback(() => {
    if(charRef.current){
      charRef.current.scrollIntoView({
        behavior: 'smooth'
      })
      charRef.current.focus();
    }
  }, [])

  // useCallback ensures referential stability for its cleanup
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if(e.key === 'Backspace'){
      setCurrentIdx(prev => prev > 0 ? prev-1 : prev)
      setUserInputs(prev => prev.slice(0, -1))
      scrollIntoView()
      return
    }
    if(e.key.length !== 1) return
    
    setIsStarted(true)
    setUserInputs(prev => [...prev, e.key])
    setCurrentIdx(prev => prev + 1)
    scrollIntoView()
  }, [setIsStarted, scrollIntoView])

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
                  ref={index === currentIdx ? charRef : null}
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