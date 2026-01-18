import { useCallback, useEffect, useRef, useState } from "react"
import { getTextContent } from "../util/difficulty-text-map"
import type { TextItem } from "../types/project"
import { useStore } from "../store/useStore"
import Overlay from "./Overlay"

const Text = () => {

  const { level, isStarted, setIsStarted, setTestCompleted, setAccuracy, setWpm, mode, timer, setCorrectChars, setIncorrectChars } = useStore();
  const [passage, setPassage] = useState<TextItem | null>(null)
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [typedWord, setTypedWord] = useState<string[]>([''])
  const containerRef = useRef<HTMLElement | null>(null)
  const charRef = useRef<HTMLSpanElement | null>(null)
  const words = passage?.text.split(' ')

  const startTimeRef = useRef<number | null>(null)
  const totalTypedCharsRef = useRef(0)
  const wrongCharsRef = useRef(0)

  useEffect(() => {
    setPassage(() => getTextContent(level))
  }, [level])

  useEffect(() => {
    if (isStarted && containerRef.current) {
      containerRef.current.focus()

      startTimeRef.current = Date.now()
    }

    if (!isStarted) {
      setCurrentWordIdx(0)
      setTypedWord([''])

      startTimeRef.current = null
      totalTypedCharsRef.current = 0
      wrongCharsRef.current = 0
      setAccuracy(100)
      setWpm(0)
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

    if (e.ctrlKey || e.altKey || e.metaKey) {
      if (e.ctrlKey && e.key === 'Backspace') {
        setTypedWord(words => {
          const copy = [...words]
          copy[currentWordIdx] = ''
          return copy
        })
      }
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
      return
    }

    if (e.key === ' ') {
      e.preventDefault()
      if (typedWord[currentWordIdx].length === 0) return

      if (currentWordIdx === (words!.length - 1)) {
        const total = totalTypedCharsRef.current
        const errorCount = wrongCharsRef.current
        const correct = Math.max(0, total - errorCount)
        setCorrectChars(correct)
        setIncorrectChars(errorCount)

        const accuracy = total === 0 ? 100 : Math.round((correct / total) * 100)
        setAccuracy(accuracy)
        setTestCompleted(true)
        return
      }
      setTypedWord(words => [...words, ''])
      setCurrentWordIdx(prev => prev + 1)
      return
    }


    if (e.key.length !== 1) return;

    totalTypedCharsRef.current += 1

    let expectedChar
    if (words) {
      const currentWord = words[currentWordIdx]
      const typedWordLen = typedWord[currentWordIdx].length
      expectedChar = currentWord[typedWordLen]
    } else {
      expectedChar = undefined
    }

    if (expectedChar !== e.key) {
      wrongCharsRef.current += 1
    }

    const total = totalTypedCharsRef.current
    const errorCount = wrongCharsRef.current
    const accuracy = total === 0 ? 100 : Math.round(((total - errorCount) / total) * 100)
    setAccuracy(accuracy)

    setTypedWord(words => {
      const copy = [...words]
      copy[currentWordIdx] += e.key
      return copy
    })
  }, [currentWordIdx, typedWord, words, setTestCompleted, isStarted, setAccuracy, setCorrectChars, setIncorrectChars])

  useEffect(() => {
    if (!isStarted) return
    if (timer === 0) return

    const elapsedMinutes =
      mode === 'timed'
        ? (60 - timer) / 60
        : timer / 60

    if (elapsedMinutes <= 0) return

    const total = totalTypedCharsRef.current
    const wrong = wrongCharsRef.current
    const correct = Math.max(0, total - wrong)

    const netWpm = Math.round((correct / 5) / elapsedMinutes)
    setWpm(netWpm)
  }, [timer, isStarted, mode])


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
              const wordTyped = wordIdx === currentWordIdx && userWord.length >= word.length

              return (
                <div
                  key={wordIdx}
                  className={`word 
                    ${wordTyped ? 'bar' : ''}
                    ${isWordIncorrect ? 'wrong' : ''}`}
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