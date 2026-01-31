import { useStore } from "../store/useStore"
import Completed from '../assets/images/icon-completed.svg'
import Confetti from '../assets/images/icon-new-pb.svg'
import Restart from '../assets/images/icon-undo.svg'
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Result = {
  baseline: {
    heading: 'Baseline Established!',
    text: 'You’ve set the bar. Now the real challenge begins—time to beat it.',
    imgSrc: Completed,
    imgAlt: 'completed-icon',
    btnText: 'Beat This Score',
  },
  completed: {
    heading: 'Test Completed!',
    text: 'Solid run. Keep pushing to beat your high score.',
    imgSrc: Completed,
    imgAlt: 'completed-icon',
    btnText: 'Go Again',
  },
  highScore: {
    heading: 'High Score Smashed!',
    text: 'You’re getting faster. That was incredible typing.',
    imgSrc: Confetti,
    imgAlt: 'bouquet-icon',
    btnText: 'Beat This Score',
  },
}

const triggerFireworks = () => {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }
  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min
  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now()
    if (timeLeft <= 0) {
      return clearInterval(interval)
    }
    const particleCount = 50 * (timeLeft / duration)
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  }, 250)
}

const ResultsPage = () => {

  const { bestScore, setBestScore, setIsStarted, setTestCompleted, wpm, accuracy, setWpm, setAccuracy, correctChars, incorrectChars } = useStore();
  const [prevBestScore] = useState<number | null>(bestScore);
  const [timestamp] = useState(() => Date.now())

  let result

  if (prevBestScore === null) {
    result = Result.baseline;
  } else if (wpm > prevBestScore) {
    result = Result.highScore;
  } else {
    result = Result.completed;
  }

  useEffect(() => {
    if (bestScore === null || wpm > bestScore) {
      setBestScore(wpm)
    }
    if (prevBestScore !== null && wpm > prevBestScore) {
      triggerFireworks()
    }

    const key = `res-${timestamp}`
    const resObj = {
      wpm, accuracy, correctChars, incorrectChars, timestamp
    }
    localStorage.setItem(key, JSON.stringify(resObj))
  }, [])

  const handleRestart = () => {
    setTestCompleted(false)
    setIsStarted(false)
    setAccuracy(100)
    setWpm(0)
  }

  return (
    <div className="overflow-hidden resultPage_wrapper bg-size-[20px] sm:bg-auto">

      <div
        className="mt-12 sm:mt-20 xl:mt-16 flex flex-col items-center gap-8"
      >
        <img src={result.imgSrc} alt={result.imgAlt} className={`${result !== Result.highScore ? 'completed-icon' : ''} w-10 h-10 sm:w-16 sm:h-16`} />
        <div className="flex flex-col items-center gap-2.5">
          <h1 className="results-header">{result.heading}</h1>
          <p className="results-subtext">{result.text}</p>
        </div>
        <div className="flex flex-col w-full justify-center sm:flex-row items-center gap-5 sm:pt-5 pb-4 sm:pb-8">
          <div className="stat_container">
            <span className="text-xl leading-[1.2] -tracking-[0.6px] text-neutral-400">WPM</span>
            <span className="text-2xl font-bold">{wpm}</span>
          </div>
          <div className="stat_container">
            <span className="text-xl leading-[1.2] -tracking-[0.6px] text-neutral-400">Accuracy</span>
            <span className={`text-2xl font-bold ${accuracy === 100 ? 'text-green-500' : 'text-red-500'}`}>{accuracy}%</span>
          </div>
          <div className="stat_container">
            <span className="text-xl leading-[1.2] -tracking-[0.6px] text-neutral-400">Characters</span>
            <span>
              <span className="text-2xl font-bold text-green-500">{correctChars}</span>
              <span className="text-2xl font-bold text-neutral-500">/</span>
              <span className="text-2xl font-bold text-red-500">{incorrectChars}</span>
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="px-4 py-2.5 flex items-center gap-2.5 font-semibold text-lg leading-[1.2] -tracking-[0.3px] rounded-xl bg-neutral-0 text-neutral-900 cursor-pointer"
        >
          {result.btnText}
          <img src={Restart} alt="restart icon" className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ResultsPage;