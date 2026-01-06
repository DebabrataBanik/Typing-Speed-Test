import Restart from '../assets/images/icon-restart.svg'
import { useStore } from '../store/useStore'

const Footer = () => {

  const { setIsStarted } = useStore();

  return (
    <footer>
      <button 
        onClick={() => setIsStarted(false)}
        className='restart-btn'
      >
        Restart Test
        <img src={Restart} />
      </button>
    </footer>
  )
}

export default Footer