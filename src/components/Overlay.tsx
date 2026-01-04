interface OverlayProps{
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>
}

const Overlay = ({setIsStarted}: OverlayProps) => {
  return (
    <div className="overlay">
      <button onClick={() => setIsStarted(true)}>Start Typing Test</button>
      <p>Or click the text and start typing</p>
    </div>
  )
}

export default Overlay