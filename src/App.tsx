import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import { useStore } from "./store/useStore"
import Achievement from "./components/ResultsPage"
import History from "./components/History"
import { useEffect, useRef } from "react"

const App = () => {
  const { isStarted, testCompleted, showHistory, setShowHistory } = useStore();
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

  return (
    <div className="relative">
      {showHistory && <History containerRef={containerRef} />}
      <div className={`wrapper ${showHistory ? 'mask': ''}`}>
        <Header />
        {!testCompleted && <Main />}
        {!testCompleted && isStarted && <Footer />}
        {testCompleted && <Achievement />}
      </div>
    </div>
  )
}

export default App