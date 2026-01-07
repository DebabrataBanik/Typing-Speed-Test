import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import type { Mode } from "./types/project"
import { useState } from "react"
import { useStore } from "./store/useStore"
import Achievement from "./components/ResultsPage"

const App = () => {

  const [mode, setMode] = useState<Mode>('timed')
  const { isStarted, testCompleted } = useStore();

  return (
    <div className="wrapper">
      <Header />
      { !testCompleted && <Main mode={mode} setMode={setMode} /> }
      { !testCompleted && isStarted && <Footer /> }
      { testCompleted && <Achievement /> }
    </div>
  )
}

export default App