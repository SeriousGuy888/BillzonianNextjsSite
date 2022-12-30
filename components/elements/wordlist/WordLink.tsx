import { NextPage } from "next"
import Link from "next/link"
import { cachedWordData } from "../../../utils/dictionaryData"

interface PageProps {
  word: string
}

const WordLink: NextPage<PageProps> = ({ word }) => {
  return (
    <Link
      href={`/words/${word}`}
      className={wordExists(word) ? "" : "redLink"}
      title={wordExists(word) ? "" : "This page does not exist."}
    >
      {word}
    </Link>
  )
}

const wordExists = (word: string) => {
  return word in cachedWordData
}

export default WordLink
