import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import type { Mode } from "./types/project"
import { useState } from "react"

const App = () => {

  const [mode, setMode] = useState<Mode>('timed')

  return (
    <div className="wrapper">
      <Header />
      <Main mode={mode} setMode={setMode} />
      <Footer />
    </div>
  )
}

export default App