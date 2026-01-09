import { useCallback, useMemo, useEffect, useState, useRef } from 'react';
import type { TextItem } from '../types/project'
import { getTextContent } from '../util/difficulty-text-map';
import Overlay from './Overlay';
import { useStore } from '../store/useStore';


const Text = () => {

  const { isStarted, setIsStarted, setTestCompleted, level } = useStore();
  const [passage, setPassage] = useState<TextItem>(() => getTextContent(level));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const charRef = useRef<HTMLSpanElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  const charArr = useMemo(() => 
    passage.text.split('').map(char => char === '—' ? '-' : char)
    ,[passage]
  )
  const charLength = charArr.length;

  useEffect(() => {
    setPassage(getTextContent(level));
  }, [level])
  
  useEffect(() => {
    if(isStarted && containerRef.current){
      containerRef.current.focus()
    }

    if(!isStarted){
      setCurrentIdx(0)
      setUserInputs([])
    }
  }, [isStarted])

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
    if (e.ctrlKey || e.altKey || e.metaKey) {
      return; 
    }
    
    if(e.key === 'Backspace'){
      setCurrentIdx(prev => prev > 0 ? prev-1 : prev)
      setUserInputs(prev => prev.slice(0, -1))
      scrollIntoView()
      return
    }
    if(e.key.length !== 1) return
    
    setIsStarted(true)
    setUserInputs(prev => [...prev, e.key])
    setCurrentIdx(prev => {
      if(prev+1 >= charLength){
        setTestCompleted(true)
      }
      return prev+1
    })
    scrollIntoView()
  }, [scrollIntoView, charLength])

  useEffect(() => {
    const textContainer = containerRef.current;

    if(textContainer){
      textContainer.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if(textContainer){
        textContainer.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown])

  // const words = passage.text.split(' ');
  return (
    <section 
      ref={containerRef}
      tabIndex={-1}
      className='text-wrapper'
    >
      <div 
        className={!isStarted ? 'layer cursor-default' : ''}
        onClick={() => setIsStarted(true)}
      >
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