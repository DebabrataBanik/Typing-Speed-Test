import ArrowDown from "../assets/images/icon-down-arrow.svg"
import type { Difficulty, Mode } from "../types/project";

interface StatsProps{
  difficulty: Difficulty;
  setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>;
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>
}

const Stats = ({difficulty, setDifficulty, mode, setMode}: StatsProps) => {

  function handleDifficultyChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    setDifficulty(e.target.value as Difficulty)
  }

  function handleModeChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>){
    setMode(e.target.value as Mode)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col xl:grid grid-cols-12 gap-8">
        {/* Left Stats */}
        <div className="col-span-5 flex items-center justify-between sm:justify-start xl:justify-between gap-6">
          <div className="stats_label">
            WPM: <span className="stats text-neutral-0">40</span>
          </div>
          <span className="stats_bar"></span>
          <div className="stats_label">
            Accuracy: <span className="stats text-red-500">94%</span>
          </div>
          <span className="stats_bar"></span>
          <div className="stats_label">
            Time: <span className="stats text-yellow-400">0:46</span>
          </div>
        </div>
        
        {/* Right Settings */}
        <div className="col-span-6 col-start-7 flex items-center gap-3.5">
          {/* Difficulty Settings */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <span className="leading-[1.2] -tracking-[0.48px] text-neutral-400">Difficulty:</span>
            <div className="flex items-center gap-1.5">
              <label>
                <input 
                  onChange={handleDifficultyChange} type="radio" 
                  name="difficulty" 
                  value='easy' 
                  checked={difficulty === 'easy'}
                />
                Easy
              </label>
              <label>
                <input 
                  onChange={handleDifficultyChange} 
                  type="radio" 
                  name="difficulty" 
                  value='medium'
                  checked={difficulty === 'medium'}
                />
                Medium
              </label>
              <label>
                <input 
                  onChange={handleDifficultyChange} 
                  type="radio" 
                  name="difficulty" 
                  value='hard'
                  checked={difficulty === 'hard'}
                />
                Hard
              </label>
            </div> 
          </div>

          <div className="sm:hidden flex-1 flex justify-center">
            <select 
              name="difficulty"
              value={difficulty}
              onChange={handleDifficultyChange}
            >
              <button>
                <selectedcontent></selectedcontent>
                <span>
                  <img src={ArrowDown} />
                </span>
              </button>
              <option value="easy">
                <span className="checkbox"></span>
                Easy
              </option>
              <option value="medium">
                <span className="checkbox"></span>
                Medium
              </option>
              <option value="hard">
                <span className="checkbox"></span>
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
              <label>
                <input 
                  onChange={handleModeChange}
                  type="radio" 
                  name="mode" 
                  value='timed'
                  checked={mode === 'timed'}
                />
                Timed (60s)
              </label>
              <label>
                <input
                  onChange={handleModeChange} 
                  type="radio" 
                  name="mode" 
                  value='passage'
                  checked={mode === 'passage'}
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
            >
              <button>
                <selectedcontent></selectedcontent>
                <span>
                  <img src={ArrowDown} />
                </span>
              </button>
              <option value="timed">
                <span className="checkbox"></span>
                Timed (60s)
              </option>
              <option value="passage">
                <span className="checkbox"></span>
                Passage
              </option>
            </select>
          </div>

        </div>
      </div>

      <hr className="col-span-12 text-neutral-700"/>
    </div>
  )
}

export default Stats