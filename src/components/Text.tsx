import { useCallback, useEffect, useRef, useState } from "react"
import { getTextContent } from "../util/difficulty-text-map"
import type { TextItem } from "../types/project"
import { useStore } from "../store/useStore"
import Overlay from "./Overlay"

const Text = () => {

  const { level, isStarted, setIsStarted, setTestCompleted } = useStore();
  const [passage, setPassage] = useState<TextItem | null>(null)
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [typedWord, setTypedWord] = useState<string[]>([''])
  const containerRef = useRef<HTMLElement | null>(null)
  const charRef = useRef<HTMLSpanElement | null>(null)
  const words = passage?.text.split(' ')

  useEffect(() => {
    setPassage(() => getTextContent(level))
  }, [level])

  useEffect(() => {
    if (isStarted && containerRef.current) {
      containerRef.current.focus()
    }

    if (!isStarted) {
      setCurrentWordIdx(0)
      setTypedWord([''])
    }
  }, [isStarted])

  const scrollIntoView = useCallback(() => {
    if (charRef.current) {
      charRef.current.scrollIntoView({
        behavior: 'smooth'
      })
      charRef.current.focus();
    }
  }, [])


  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isStarted) return
    if (e.ctrlKey && e.key === 'Backspace') {
      setTypedWord(words => {
        const copy = [...words]
        if (copy.length > 0) {
          copy[currentWordIdx] = ''
        }
        return copy
      })
    }
    if (e.ctrlKey || e.altKey || e.metaKey) {
      return;
    }
    if (e.key === ' ') {
      e.preventDefault()
      if (typedWord[currentWordIdx].length === 0) return
      if (currentWordIdx === (words!.length - 1)) {
        setTestCompleted(true)
        return
      }
      setTypedWord(words => [...words, ''])
      setCurrentWordIdx(prev => prev + 1)
      return
    }

    if (e.key === 'Backspace') {
      setTypedWord(words => {
        const copy = [...words]
        if (copy.length > 0) {
          copy[currentWordIdx] = copy[currentWordIdx].slice(0, -1)
        }
        return copy
      })
    }

    if (e.key.length !== 1) return;

    setTypedWord(words => {
      const copy = [...words]
      copy[currentWordIdx] += e.key
      return copy
    })
  }, [currentWordIdx, typedWord, words, setTestCompleted, isStarted])

  useEffect(() => {
    const textContainer = containerRef.current

    if (textContainer) {
      textContainer.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (textContainer) {
        textContainer.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [handleKeyDown])

  useEffect(() => {
    scrollIntoView()
  }, [currentWordIdx, typedWord])

  return (
    <section
      ref={containerRef}
      tabIndex={-1}
      className="text-wrapper"
    >
      <div
        className={!isStarted ? 'layer cursor-default' : ''}
        onClick={() => setIsStarted(true)}
      >
        <p className="text-container">
          {
            words?.map((word, wordIdx) => {
              const userWord = typedWord[wordIdx] ?? ''
              const isWordCompleted = wordIdx < currentWordIdx
              const isWordCorrect = userWord === word
              const isWordIncorrect = isWordCompleted && !isWordCorrect

              return (
                <div
                  key={wordIdx}
                  className={`word ${isWordIncorrect ? 'incorrect_word' : ''}`}
                >
                  {
                    word.split('').map((char, charIdx) => {
                      const activeChar = currentWordIdx === wordIdx && charIdx === userWord.length
                      const userChar = userWord[charIdx]

                      const isCorrect = userChar === char
                      const isIncorrect = userChar !== undefined && userChar !== char
                      return (
                        <span
                          key={charIdx}
                          ref={activeChar ? charRef : null}
                          className={`${activeChar ? 'active' : ''}
                            ${isCorrect ? 'correct' : ''}
                            ${isIncorrect ? 'incorrect' : ''}
                          `}
                        >
                          {char}
                        </span>
                      )
                    })
                  }
                  {userWord.slice(word.length, word.length + 10).split('').map((char, i) => (
                    <span key={`overflow-${i}`} className="incorrect">
                      {char}
                    </span>
                  ))}
                </div>
              )
            })
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