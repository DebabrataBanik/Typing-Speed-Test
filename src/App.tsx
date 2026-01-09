import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import { useStore } from "./store/useStore"
import Achievement from "./components/ResultsPage"

const App = () => {
  const { isStarted, testCompleted } = useStore();

  return (
    <div className="wrapper">
      <Header />
      { !testCompleted && <Main /> }
      { !testCompleted && isStarted && <Footer /> }
      { testCompleted && <Achievement /> }
    </div>
  )
}

export default App