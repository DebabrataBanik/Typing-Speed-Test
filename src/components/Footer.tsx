import Restart from '../assets/images/icon-restart.svg'

const Footer = () => {
  return (
    <footer>
      <button className='restart-btn'>
        Restart Test
        <img src={Restart} />
      </button>
    </footer>
  )
}

export default Footer