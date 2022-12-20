import type { NextPage } from "next"
import Link from "next/link"
import styles from "../../../styles/Wordlist.module.scss"

const WordPreview: NextPage<{ word: string }> = ({ word }) => {
  return (
    <Link href={`/words/${word}`}>
      <div className={styles.wordLink}>
        <h3>{word}</h3>
      </div>
    </Link>
  )
}

export default WordPreview
