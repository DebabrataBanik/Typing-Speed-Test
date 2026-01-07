import Stats from "./Stats"
import Text from "./Text"
import { useState } from "react"
import type { Difficulty, Mode } from "../types/project"
import { useStore } from "../store/useStore";

interface MainProps{
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
}

const Main = ({mode, setMode}: MainProps ) => {

  const { level } = useStore();
  const [difficulty, setDifficulty] = useState<Difficulty>(level as Difficulty);

  return (
    <main className="flex flex-col gap-8">
      <Stats difficulty={difficulty} setDifficulty={setDifficulty} mode={mode} setMode={setMode} />
      <Text difficulty={difficulty} />
    </main>
  )
}

export default Main