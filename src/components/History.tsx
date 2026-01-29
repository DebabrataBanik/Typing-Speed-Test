import { X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Result } from "@/types/project";
import { useStore } from "@/store/useStore";

const History = () => {

  const [results, setResults] = useState<Result[]>([])
  const { setShowHistory } = useStore();

  useEffect(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('res-'))
    const res = keys.map(key => JSON.parse(localStorage.getItem(key) || '{}')).sort((a,b) => b.timestamp - a.timestamp)
    setResults(res)
  }, [])

  return (
    <div className="history_wrapper">
      <section className="w-full">
        <div className="p-5 sm:px-6 sm:py-5 border-b border-neutral-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Test Results</h2>
            <p className="text-neutral-400 text-xs">Recent Activity</p>
          </div>
          <button
            onClick={() => setShowHistory(false)} 
            className="cursor-pointer"
          >
            <X className="w-8 h-8 p-1 hover:bg-neutral-700 hover:p-1.5 hover:rounded-full duration-300 transition-all"/>
          </button>
        </div>
        <div className="p-5 flex flex-col gap-2">
          {
            results.length === 0 ? (
              <div className="p-2 text-center text-neutral-400">
                <p>No Results to view.</p>
              </div>
            )
            :
            (
              results.map((res) => {
                const dateObj = new Date(res.timestamp)
                const year = dateObj.getFullYear()
                const month = dateObj.getMonth() + 1
                const day = dateObj.getDate()
                const hours = dateObj.getHours()
                const mins = dateObj.getMinutes()

                const date = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString()}`
                const time = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
                
                console.log(year, month, day, hours, mins)
                return (
                  <div className="relative">
                    <div 
                      key={res.timestamp}
                      className="result_tab"
                    >
                      <div title='Date and Time' className="flex flex-col items-start gap-.5">
                        <span className="text-xs text-neutral-400">{date}</span>
                        <span className="text-sm">{time}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-neutral-400">WPM</span>
                        <span className="text-sm">{res.wpm}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-neutral-400">Accuracy</span>
                        <span className="text-sm">{res.accuracy}%</span>
                      </div> 
                      <div className="flex flex-col items-end-safe" title="Correct/Incorrect">
                        <span className="text-xs text-neutral-400">Characters</span>
                        <div className="text-sm flex items-center">
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