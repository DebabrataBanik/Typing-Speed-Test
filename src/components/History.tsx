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
        <div className="p-5 border-b border-neutral-700 flex gap-2 items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Test Results</h2>
            <p className="text-neutral-400 text-sm">Recent Activity</p>
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
              results.map((res,idx) => {
                return (
                  <div 
                    key={res.timestamp}
                    className="py-4 px-5 border border-neutral-700 rounded-xl flex justify-between items-center gap-2"
                  >
                    <span>{idx+1}</span>
                    <span>{res.wpm}</span>
                    <span>{res.accuracy}%</span> 
                    <span>{res.correctChars}/{res.incorrectChars}</span> 
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