import { useStore } from "../store/useStore"
import Completed from '../assets/images/icon-completed.svg'
import Restart from '../assets/images/icon-undo.svg'

const ResultsPage = () => {

  const { bestScore, setIsStarted, setTestCompleted } = useStore();

  const handleRestart = () => {
    setTestCompleted(false)
    setIsStarted(false)
  }

  return (
    <div className="mt-8 sm:mt-20 xl:mt-16 flex flex-col items-center gap-6 sm:gap-8">
      <img src={Completed} alt="completed icon" className="completed-icon" />
      <div className="flex flex-col items-center gap-2.5">
        <h1 className="results-header">Test Complete</h1>
        <p className="results-subtext">Solid run. Keep pushing to beat your high score.</p>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-5 sm:pt-5 pb-4 sm:pb-8">
        <div>WPM </div>
        <div>Accuracy </div>
        <div>Characters</div>
      </div>
      <button
        onClick={handleRestart} 
        className="px-4 py-2.5 flex items-center gap-2.5 font-semibold text-lg leading-[1.2] -tracking-[0.3px] rounded-xl bg-neutral-0 text-neutral-900 cursor-pointer"
      >
        Go Again
        <img src={Restart} alt="restart icon" className="w-4 h-4"/>
      </button>
    </div>
  )
}

export default ResultsPage;