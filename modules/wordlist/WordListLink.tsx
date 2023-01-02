import type { NextPage } from "next"
import Link from "next/link"
import styles from "./Wordlist.module.scss"
import { padWord } from "../../utils/dictionaryData"

const WordPreview: NextPage<{ word: string }> = ({ word }) => {
  return (
    <Link className={styles.cardContainer} href={`/words/${padWord(word)}`}>
      <div className={styles.card}>
        <h3>{word}</h3>
      </div>
    </Link>
  )
}

export default WordPreview
