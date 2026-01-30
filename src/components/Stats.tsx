import { useEffect } from "react";
import type { Difficulty, Mode } from "../types/project";
import { useStore } from "../store/useStore";
import { formatTimer } from "../util/format-timer";

const Stats = () => {
  const { isStarted, setIsStarted, setTestCompleted, setLevel, level, mode, setMode, accuracy, wpm, timer, setTimer } = useStore();

  useEffect(() => {
    if (!isStarted) setTimer(mode === 'timed' ? 60 : 0);
  }, [isStarted, mode])


  useEffect(() => {
    if (!isStarted) return

    const timerId = setInterval(() => {
      setTimer(prev => {
        if (mode === 'timed') {
          if (prev <= 1) return 0
          return prev - 1;
        } else {
          return prev + 1;
        }
      })
    }, 1000)

    return () => clearInterval(timerId);
  }, [isStarted, mode])

  useEffect(() => {
    if (mode === 'timed' && timer === 0 && isStarted) {
      setIsStarted(false)
      setTestCompleted(true)
    }
  }, [timer, mode, isStarted])


  function handleDifficultyChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setLevel(e.target.value as Difficulty)
  }

  function handleModeChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
    setMode(e.target.value as Mode)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLLabelElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const input = e.currentTarget.querySelector('input');
      if (input && !input.disabled) {
        input.click();
      }
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col xl:grid grid-cols-12 gap-8">
        {/* Left Stats */}
        <div className="col-span-5 flex items-center justify-between sm:justify-start xl:justify-between gap-6">
          <div className="stats_label">
            WPM: <span className="stats text-neutral-0">{wpm}</span>
          </div>
          <span className="stats_bar"></span>
          <div className="stats_label">
            Accuracy: <span className="stats text-red-500">{accuracy}%</span>
          </div>
          <span className="stats_bar"></span>
          <div className="stats_label">
            Time: <span className="stats text-yellow-400">{formatTimer(timer)}</span>
          </div>
        </div>

        {/* Right Settings */}
        <div className="col-span-6 col-start-7 flex items-center gap-3.5">
          {/* Difficulty Settings */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <span className="leading-[1.2] -tracking-[0.48px] text-neutral-400">Difficulty:</span>
            <div className="flex items-center gap-1.5">
              <label
                className={isStarted ? 'cursor-not-allowed' : ''}
                tabIndex={isStarted ? -1 : 0}
                onKeyDown={handleKeyDown}
              >
                <input
                  onChange={handleDifficultyChange}
                  type="radio"
                  name="difficulty"
                  value='easy'
                  checked={level === 'easy'}
                  disabled={isStarted}
                  tabIndex={-1}
                />
                Easy
              </label>
              <label
                className={isStarted ? 'cursor-not-allowed' : ''}
                tabIndex={isStarted ? -1 : 0}
                onKeyDown={handleKeyDown}
              >
                <input
                  onChange={handleDifficultyChange}
                  type="radio"
                  name="difficulty"
                  value='medium'
                  checked={level === 'medium'}
                  disabled={isStarted}
                  tabIndex={-1}
                />
                Medium
              </label>
              <label
                className={isStarted ? 'cursor-not-allowed' : ''}
                tabIndex={isStarted ? -1 : 0}
                onKeyDown={handleKeyDown}
              >
                <input
                  onChange={handleDifficultyChange}
                  type="radio"
                  name="difficulty"
                  value='hard'
                  checked={level === 'hard'}
                  disabled={isStarted}
                />
                Hard
              </label>
            </div>
          </div>

          <div className="sm:hidden flex-1 flex justify-center">
            <select
              name="difficulty"
              value={level}
              onChange={handleDifficultyChange}
              disabled={isStarted}
              tabIndex={0}
              className='bg-position-[center_right_20%]'
            >
              {/* <button>
                <selectedcontent></selectedcontent>
                <span>
                  <img src={ArrowDown} />
                </span>
              </button> */}
              <option value="easy">
                Easy
              </option>
              <option value="medium">
                Medium
              </option>
              <option value="hard">
                Hard
              </option>
            </select>
          </div>

          {/* Separator */}
          <span className="hidden sm:block stats_bar h-8 xl:h-full"></span>

          {/* Mode Settings */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="leading-[1.2] -tracking-[0.48px] text-neutral-400">Mode:</span>
            <div className="flex items-center gap-1.5">
              <label
                className={isStarted ? 'cursor-not-allowed' : ''}
                tabIndex={isStarted ? -1 : 0}
                onKeyDown={handleKeyDown}
              >
                <input
                  onChange={handleModeChange}
                  type="radio"
                  name="mode"
                  value='timed'
                  checked={mode === 'timed'}
                  disabled={isStarted}
                  tabIndex={-1}
                />
                Timed (60s)
              </label>
              <label
                className={isStarted ? 'cursor-not-allowed' : ''}
                tabIndex={isStarted ? -1 : 0}
                onKeyDown={handleKeyDown}
              >
                <input
                  onChange={handleModeChange}
                  type="radio"
                  name="mode"
                  value='passage'
                  checked={mode === 'passage'}
                  disabled={isStarted}
                  tabIndex={-1}
                />
                Passage
              </label>
            </div>
          </div>

          <div className="sm:hidden flex-1 flex justify-center">
            <select
              name="mode"
              value={mode}
              onChange={handleModeChange}
              disabled={isStarted}
              tabIndex={0}
              className='bg-position-[center_right_10%]'
            >
              {/* <button>
                <selectedcontent></selectedcontent>
                <span>
                  <img src={ArrowDown} />
                </span>
              </button> */}
              <option value="timed">
                Timed (60s)
              </option>
              <option value="passage">
                Passage
              </option>
            </select>
          </div>

        </div>
      </div>

      <hr className="col-span-12 text-neutral-700" />
    </div>
  )
}

export default Stats