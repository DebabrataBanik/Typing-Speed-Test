import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"
import { getTextContent } from "../util/difficulty-text-map"
import type { TextItem } from "../types/project"
import { useStore } from "../store/useStore"
import Overlay from "./Overlay"
import { MousePointer2 } from "lucide-react"

const Text = () => {

  const { level, isStarted, isPaused, setIsPaused, setIsStarted, setTestCompleted, setAccuracy, setWpm, mode, timer, setCorrectChars, setIncorrectChars, testCompleted } = useStore();
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
    // load new passage whenever difficulty level changes
    setPassage(getTextContent(level))
  }, [level])

  useEffect(() => {
    // focus input when test starts
    if (isStarted && inputRef.current) {
      inputRef.current.focus()
    }

    // reset local vars and refs when isStarted is false
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

  // input keyDown handler to prevent shortcuts
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

  // main typing engine: handles character scoring, word commits, and test completion
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // if test not started return
    if (!isStarted || !words) return

    // use latest updated input value
    const value = e.target.value

    // space commits current word
    if (value.endsWith(' ')) {
      const currentTypedWord = value.trim()

      // ignore leading spaces
      if (currentTypedWord.length === 0) {
        setInputText('')
        return
      }

      // ignore if its the last word of passage
      if (currentWordIdx === words.length - 1) {
        return
      }

      // add word typed in input to typedWord state array
      setTypedWord(words => {
        // clone array to avoid mutating state directly
        const copy = [...words]
        copy[currentWordIdx] = currentTypedWord
        if (copy.length <= currentWordIdx + 1) {
          copy.push('')
        }
        return copy
      })
      // incerement current word index and reset input value
      setCurrentWordIdx(prev => prev + 1)
      setInputText('')
      return
    }

    // access state value for length before re render
    const wordLengthBeforeUpdate = inputText.length
    // updated latest word length
    const updatedWordLength = value.length

    // only score on character insertion (ignore backspace)
    if (updatedWordLength > wordLengthBeforeUpdate) {
      const currentWord = words[currentWordIdx]
      const charIdx = updatedWordLength - 1
      const expectedChar = currentWord[charIdx]
      const typedChar = value[charIdx]

      totalTypedCharsRef.current += 1

      // increment wrong character ref count when incorrect character typed
      if (expectedChar !== typedChar) {
        wrongCharsRef.current += 1
      }

      // update live stats (correct / incorrect / accuracy)
      const total = totalTypedCharsRef.current
      const errorCount = wrongCharsRef.current
      const correct = Math.max(0, total - errorCount)
      setCorrectChars(correct)
      setIncorrectChars(errorCount)
      // calculate accuracy
      const accuracy = total === 0 ? 100 : Math.round((correct / total) * 100)
      setAccuracy(accuracy)

      // end test when final word is fully typed
      if (currentWordIdx === words.length - 1 && value.length === currentWord.length) {
        setTestCompleted(true)
        setIsStarted(false)
      }
    }

    // update each word on change
    setTypedWord(words => {
      const copy = [...words]
      copy[currentWordIdx] = value
      return copy
    })
    // update input value state
    setInputText(value)

    // recreate handler when typing state changes, setter deps included only for ESLint
  }, [currentWordIdx, inputText, words, setTestCompleted, isStarted, setAccuracy, setCorrectChars, setIncorrectChars, setIsStarted])

  // recalculate WPM on timer updates and force final calculation when test completes (testCompletd ensures that)
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

  // always view active word in the center of the container
  useEffect(() => {
    charRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest'
    })
  }, [currentWordIdx])

  // input blur handler
  const handleBlur = () => {
    // prevent blur when user switches tabs
    if (!document.hasFocus()) {
      return; 
    }
    if(isStarted) setIsPaused(true)
  }

  // input focus handler
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    // places caret at the end of input text and selects nothing 
    input.setSelectionRange(input.value.length, input.value.length)
    setIsPaused(false)
  }

  return (
    <section
      // container is the interaction surface
      ref={containerRef}
      className={`text-wrapper ${isStarted && !isPaused ? 'cursor-none' : ''} `}
      // focus input on container click (start test on first click, refocus after blur)
      onClick={() => {
        inputRef.current?.focus()
        setIsStarted(true)
      }}
      // prevent container click from blurring focused input 
      onMouseDown={(e) => e.preventDefault()}
    >
      <div
        className={!isStarted || isPaused ? 'layer cursor-default' : ''}
      >
        {/* invisible input, prevent auto behavior */}
        <input
          aria-label="Typing input"
          name="input"
          type="text"
          ref={inputRef}
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="absolute opacity-0"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
        {/* render words as per-character spans with caret + correctness tracking */}
        <div className="text-container select-none">
          {
            // derive per-word typing state (completed / incorrect / active)
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
                    // render each character and mark active / correct / incorrect
                    word.split('').map((char, charIdx) => {
                      const activeChar = currentWordIdx === wordIdx && charIdx === userWord.length

                      const userChar = userWord[charIdx]

                      const isCorrect = userChar === char
                      const isIncorrect = userChar !== undefined && userChar !== char
                      return (
                        <span
                          key={charIdx}
                          // attach ref only to active character so we can auto-scroll caret into view
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
                  {/* extra typed characters beyond word length */}
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
      {/* initial overlay shown before typing starts */}
      {
        !isStarted && <Overlay />
      }
      {/* shown when input loses focus (pause state) */}
      {
        isPaused && 
        <div
          className="w-[80%] sm:w-max absolute top-1/2 left-1/2 -translate-1/2 flex items-center gap-2 pointer-events-none">
          <MousePointer2 size={20} />
          <p className="text-sm sm:text-base text-center">You moved away! Click to start typing again</p>
        </div>
      }
    </section>
  )
}

export default Text