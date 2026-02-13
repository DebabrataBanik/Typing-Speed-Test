import { RotateCw } from 'lucide-react';
import { useStore } from '../store/useStore'

const Footer = () => {

  const { setIsStarted } = useStore();

  return (
    <footer>
      <button
        aria-label='Restart test'
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setIsStarted(false)}
        className='text-neutral-400 cursor-pointer'
      >
        <RotateCw />
      </button>
    </footer>
  )
}

export default Footer