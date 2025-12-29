import Stats from "./Stats"
import Text from "./Text"
import { useState } from "react"
import type { Difficulty, Mode } from "../types/project"

const Main = () => {

  const [difficulty, setDifficulty] = useState<Difficulty>('hard')
  const [mode, setMode] = useState<Mode>('timed')

  console.log(difficulty, mode)

  return (
    <main className="flex flex-col gap-8">
      <Stats difficulty={difficulty} setDifficulty={setDifficulty} mode={mode} setMode={setMode} />
      <Text />
    </main>
  )
}

export default Main