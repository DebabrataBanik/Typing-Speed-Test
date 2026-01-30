import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Result } from "@/types/project";
import { useStore } from "@/store/useStore";

const formatDate = (timestamp: number) => {
  const dateObj = new Date(timestamp);
  return {
    date: dateObj.toLocaleDateString('en-GB'),
    time: dateObj.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  };
};

type Props = {
  containerRef: React.Ref<HTMLDivElement>; 
} 

const History = ({ containerRef }: Props) => {

  const [results, setResults] = useState<Result[]>([])
  const { setShowHistory } = useStore();

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('res-'))
    const res = keys.map(key => JSON.parse(localStorage.getItem(key) || '{}')).sort((a,b) => b.timestamp - a.timestamp)
    setResults(res)
  }, [])

  const handleClearHistory = () => {
    localStorage.clear()
    setResults([])
  }

  return (
    <div 
      ref={containerRef}
      className="history_wrapper"
    >
      <section className="w-full">
        <div className="p-5 sm:px-6 sm:py-5 border-b border-neutral-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test Results</h2>
            <p className="text-neutral-400 text-xs">Recent Activity</p>
          </div>
          <button
            onClick={handleClearHistory} 
            disabled={results.length === 0}
            className={`ml-auto mr-4 text-xs px-3 py-1 shadow-md border rounded-md transition-all duration-200 ${
              results.length === 0
                ? 'text-neutral-600 border-neutral-800 cursor-not-allowed'
                : 'text-neutral-400 border-transparent hover:border-neutral-700 active:shadow-none cursor-pointer'
            }`}>Clear All</button>
          <button
            onClick={() => setShowHistory(false)} 
            className="cursor-pointer border border-transparent hover:border-neutral-700 hover:scale-90 shadow-md rounded-full transition-all duration-200"
          >
            <X className="w-9 h-9 p-2 transition-all duration-300"/>
          </button>
        </div>
        <div className={`p-5 flex flex-col gap-4 h-[475px] sm:h-[505px] overflow-y-scroll ${results.length > 6 ? 'scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent' : 'scrollbar-none'} `}>
          {
            results.length === 0 ? (
              <div className="p-2 text-center text-neutral-400 h-full flex items-center justify-center">
                <p className="text-sm tracking-wide text-neutral-700 font-semibold">No History Found</p>
              </div>
            )
            :
            (
              results.map((res) => {
                const { date, time } = formatDate(res.timestamp)
                return (
                  <div key={res.timestamp} className="relative">
                    <div 
                      className="result_tab"
                    >
                      <div title='Date and Time' className="flex flex-col items-start">
                        <span className="text-[10px] sm:text-xs text-neutral-400">{date}</span>
                        <span className="text-xs sm:text-sm">{time}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] sm:text-xs text-neutral-400">WPM</span>
                        <span className="text-xs sm:text-sm">{res.wpm}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] sm:text-xs text-neutral-400">Accuracy</span>
                        <span className="text-xs sm:text-sm">{res.accuracy}%</span>
                      </div> 
                      <div className="flex flex-col items-end-safe" title="Correct/Incorrect">
                        <span className="text-[10px] sm:text-xs text-neutral-400">Characters</span>
                        <div className="text-xs sm:text-sm flex items-center">
                          <span className="text-green-500">{res.correctChars}</span>
                          <span className="text-neutral-400">/</span>
                          <span className="text-red-500">{res.incorrectChars}</span>
                        </div>
                      </div> 
                    </div>
                  </div>
                )
              })
            )
          }
        </div>
      </section>
    </div>
  )
}

export default History;