import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import type { Mode } from "./types/project"
import { useState } from "react"

const App = () => {

  const [mode, setMode] = useState<Mode>('timed')
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="wrapper">
      <Header />
      <Main mode={mode} setMode={setMode} />
      {
        isStarted && <Footer />
      }
    </div>
  )
}

export default App