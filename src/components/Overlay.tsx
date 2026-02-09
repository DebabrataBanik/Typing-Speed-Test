import { useStore } from "../store/useStore"

const Overlay = () => {

  const { setIsStarted } = useStore()

  return (
    <div className="overlay">
      <button aria-label="Start test" onClick={() => setIsStarted(true)}>Start Typing Test</button>
      <p>Or click the text and start typing</p>
    </div>
  )
}

export default Overlay