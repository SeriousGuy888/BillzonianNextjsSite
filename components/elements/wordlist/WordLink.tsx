import type { NextPage } from "next"
import Link from "next/link"
import styles from "../../../styles/Wordlist.module.scss"
import { sanitiseWord } from "../../../utils/dictionaryData"

const WordPreview: NextPage<{ word: string }> = ({ word }) => {
  return (
    <Link href={`/words/${sanitiseWord(word)}`}>
      <div className={styles.wordLink}>
        <h3>{word}</h3>
      </div>
    </Link>
  )
}

export default WordPreview
