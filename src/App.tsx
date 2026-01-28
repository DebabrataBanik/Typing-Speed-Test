import Header from "./components/Header"
import Main from "./components/Main"
import Footer from "./components/Footer"
import { useStore } from "./store/useStore"
import Achievement from "./components/ResultsPage"
import History from "./components/History"

const App = () => {
  const { isStarted, testCompleted, showHistory } = useStore();

  return (
    <div className="relative">
      {showHistory && <History />}
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