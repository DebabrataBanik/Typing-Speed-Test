import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import { useStore } from "./store/useStore"
import Achievement from "./components/ResultsPage"
import History from "./components/History"
import { useEffect, useRef } from "react"
import { Toaster } from "./components/ui/sonner"
import { toast } from "sonner"

const App = () => {
  const { isStarted, testCompleted, showHistory, setShowHistory, setIsStarted, setisPaused } = useStore();
  const containerRef = useRef<HTMLDivElement | null>(null)

  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if(containerRef.current && !containerRef.current.contains(e.target as Node)){
        setShowHistory(false)
      }
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  useEffect(() => {
    const handleTabChange = () => {
      if (isStarted && document.visibilityState === 'hidden') {
        setIsStarted(false)
        toast.error('Your test was stopped because you moved away from the page.', { 
          position: 'top-right',
          style: {
            backgroundColor: 'hsl(354, 63%, 57%, 0.1)',
            color: 'var(--color-red-500)',
            border: '1px solid var(--color-red-500)',
            backdropFilter: 'blur(50px)'
          } 
        })
      }
    }
    setisPaused(false)
    document.addEventListener('visibilitychange', handleTabChange)
    return () => document.removeEventListener('visibilitychange', handleTabChange)
  }, [isStarted])

  return (
    <div className="relative">
      {showHistory && <History containerRef={containerRef} />}
      <div className={`wrapper ${showHistory ? 'mask': ''}`}>
        <Header />
        {!testCompleted && <Main />}
        {!testCompleted && isStarted && <Footer />}
        {testCompleted && <Achievement />}
      </div>
      <Toaster />
    </div>
  )
}

export default App