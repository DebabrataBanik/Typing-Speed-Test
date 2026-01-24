import logoLarge from "../assets/images/logo-large.svg"
import logoSmall from "../assets/images/logo-small.svg"
import personalBest from "../assets/images/icon-personal-best.svg"
import { useStore } from "../store/useStore"

const Header = () => {
  const { bestScore } = useStore();
  return (
    <header>
      <div className="hidden sm:flex items-center gap-2">
        <img src={logoLarge} alt="Logo" />
      </div>
      <div className="flex items-center w-[28px] h-[28px] sm:hidden">
        <img src={logoSmall} alt='Logo' />
      </div>
      <div className="flex items-center gap-2.5">
        <img src={personalBest} className="w-[18px] h-4 sm:w-5 sm:h-[18px]" alt="Personal Best" />
        <p className="text-base -tracking-[0.48px] sm:text-lg leading-[1.2] sm:-tracking-[0.6px] text-neutral-400">
          <span className="hidden sm:inline-block">Personal best:</span>
          <span className="sm:hidden">Best:</span>
          <span className="text-neutral-0"> {bestScore ?? 0} WPM</span>
        </p>
      </div>
    </header>
  )
}

export default Header