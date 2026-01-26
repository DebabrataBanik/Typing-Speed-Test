import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import { getTextContent } from "../util/difficulty-text-map"
import type { TextItem } from "../types/project"
import { useStore } from "../store/useStore"
import Overlay from "./Overlay"

const Text = () => {

  const { level, isStarted, setIsStarted, setTestCompleted, setAccuracy, setWpm, mode, timer, setCorrectChars, setIncorrectChars, testCompleted } = useStore();
  const [passage, setPassage] = useState<TextItem | null>(null)
  const [currentWordIdx, setCurrentWordIdx] = useState(0)
  const [typedWord, setTypedWord] = useState<string[]>([''])
  const [inputText, setInputText] = useState('')
  const containerRef = useRef<HTMLElement | null>(null)
  const charRef = useRef<HTMLSpanElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const words = passage?.text.split(' ')

  const totalTypedCharsRef = useRef(0)
  const wrongCharsRef = useRef(0)

  useEffect(() => {
    setPassage(() => getTextContent(level))
  }, [level])

  useEffect(() => {
    if (isStarted && inputRef.current) {
      inputRef.current.focus()
    }

    if (!isStarted) {
      setCurrentWordIdx(0)
      setTypedWord([''])
      setInputText('')

      totalTypedCharsRef.current = 0
      wrongCharsRef.current = 0
      setAccuracy(100)
      setWpm(0)
    }
  }, [isStarted])

  const scrollIntoView = useCallback(() => {
    if (charRef.current) {
      charRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      })
    }
  }, [])

  const handleKeyDown = (e: KeyboardEvent) => {
    const copy = (e.ctrlKey || e.metaKey) && e.key === 'c'
    const paste = (e.ctrlKey || e.metaKey) && e.key === 'v'
    const undo = (e.ctrlKey || e.metaKey) && e.key === 'z'
    const del = (e.ctrlKey || e.metaKey) && e.key === 'x'
    const selectAll = (e.ctrlKey || e.metaKey) && e.key === 'a'

    if (copy || paste || undo || del || selectAll) {
      e.preventDefault()
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  }

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isStarted || !words) return

    const value = e.target.value

    if (value.endsWith(' ')) {
      const currentTypedWord = value.trim()

      if (currentTypedWord.length === 0) {
        setInputText('')
        return
      }

      if (currentWordIdx === words.length - 1) {
        return
      }

      setTypedWord(words => {
        const copy = [...words]
        copy[currentWordIdx] = currentTypedWord
        if (copy.length <= currentWordIdx + 1) {
          copy.push('')
        }
        return copy
      })
      setCurrentWordIdx(prev => prev + 1)
      setInputText('')
      return
    }

    const wordLengthBeforeUpdate = inputText.length
    const updatedWordLength = value.length

    if (updatedWordLength > wordLengthBeforeUpdate) {
      const currentWord = words[currentWordIdx]
      const charIdx = updatedWordLength - 1
      const expectedChar = currentWord[charIdx]
      const typedChar = value[charIdx]

      totalTypedCharsRef.current += 1

      if (expectedChar !== typedChar) {
        wrongCharsRef.current += 1
      }

      const total = totalTypedCharsRef.current
      const errorCount = wrongCharsRef.current
      const correct = Math.max(0, total - errorCount)
      setCorrectChars(correct)
      setIncorrectChars(errorCount)
      const accuracy = total === 0 ? 100 : Math.round((correct / total) * 100)
      setAccuracy(accuracy)

      if (currentWordIdx === words.length - 1 && value.length === currentWord.length) {
        setTestCompleted(true)
      }
    }

    setTypedWord(words => {
      const copy = [...words]
      copy[currentWordIdx] = value
      return copy
    })
    setInputText(value)

  }, [currentWordIdx, inputText, words, setTestCompleted, isStarted, setAccuracy, setCorrectChars, setIncorrectChars])

  useEffect(() => {
    if (!isStarted) return

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
  }, [timer, isStarted, mode, testCompleted])

  useEffect(() => {
    scrollIntoView()
  }, [currentWordIdx, scrollIntoView])

  return (
    <section
      ref={containerRef}
      className="text-wrapper"
    >
      <div
        className={!isStarted ? 'layer cursor-default' : ''}
        onClick={() => {
          inputRef.current?.focus()
          setIsStarted(true)
        }}
      >
        <input
          type="text"
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="absolute opacity-0 pointer-events-none"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        <div className="text-container">
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
        </div>
      </div>
      {
        !isStarted && <Overlay />
      }
    </section>
  )
}

export default Text