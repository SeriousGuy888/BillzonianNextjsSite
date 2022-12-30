import { NextPage } from "next"
import Link from "next/link"
import { ReactNode } from "react"
import { cachedWordData } from "../../../utils/dictionaryData"

interface PageProps {
  word: string
  children?: ReactNode
}

const WordLink: NextPage<PageProps> = ({ word, children }) => {
  return (
    <Link
      href={`/words/${word}`}
      className={wordExists(word) ? "" : "redLink"}
      title={wordExists(word) ? "" : "This page does not exist."}
    >
      {children ?? word}
    </Link>
  )
}

const wordExists = (word: string) => {
  return word in cachedWordData
}

export default WordLink
