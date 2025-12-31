import type { Difficulty } from '../types/project'
import { getTextContent } from '../util/difficulty-text-map';

interface TextProps{
  difficulty: Difficulty;
}

const Text = ({difficulty}: TextProps) => {

  const data = getTextContent(difficulty);

  return (
    <section className='text-wrapper'>
      <p className='text'>{data.text}</p>
    </section>
  )
}

export default Text