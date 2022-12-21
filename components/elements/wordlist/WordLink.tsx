import type { NextPage } from "next"
import Link from "next/link"
import styles from "../../../styles/Wordlist.module.scss"

const WordPreview: NextPage<{ word: string }> = ({ word }) => {
  let wordPath = word
  if (word.startsWith(".")) {
    wordPath = ` ${word}` // Add a space because the period at the start messes with routes
  }

  return (
    <Link href={`/words/${encodeURI(wordPath)}`}>
      <div className={styles.wordLink}>
        <h3>{word}</h3>
      </div>
    </Link>
  )
}

export default WordPreview
