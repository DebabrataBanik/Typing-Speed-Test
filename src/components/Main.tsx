import Stats from "./Stats"
import Text from "./Text"
import { useState } from "react"
import type { Difficulty, Mode } from "../types/project"

interface MainProps{
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const Main = ({mode, setMode}: MainProps ) => {

  const [difficulty, setDifficulty] = useState<Difficulty>('easy')

  return (
    <main className="flex flex-col gap-8">
      <Stats difficulty={difficulty} setDifficulty={setDifficulty} mode={mode} setMode={setMode} />
      <Text difficulty={difficulty} />
    </main>
  )
}

export default Main