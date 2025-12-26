import ArrowDown from "../assets/images/icon-down-arrow.svg"

const Stats = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col xl:grid grid-cols-12 gap-8">
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
        <div className="col-span-6 col-start-7 flex items-center gap-3.5">
          <div className="hidden sm:flex items-center justify-between gap-3">
            <span className="leading-[1.2] -tracking-[0.48px] text-neutral-400">Difficulty:</span>
            <div className="flex items-center gap-1.5">
              <button>Easy</button>
              <button>Medium</button>
              <button>Hard</button>
            </div> 
          </div>

          <div className="sm:hidden flex-1 flex justify-center">
            <select>
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

          <span className="hidden sm:block stats_bar h-8 xl:h-full"></span>

          <div className="hidden sm:flex items-center gap-3">
            <span className="leading-[1.2] -tracking-[0.48px] text-neutral-400">Mode:</span>
            <div className="flex items-center gap-1.5">
              <button>Timed (60s)</button>
              <button>Passage</button>
            </div>
          </div>

          <div className="sm:hidden flex-1 flex justify-center">
            <select>
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