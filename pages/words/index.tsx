import { getWordsOnPage } from "../../utils/dictionaryData"
import WordLink from "../../components/elements/wordlist/WordLink"
import styles from "../../styles/Wordlist.module.scss"

export default function Words({ words }: { words: string[] }) {
  return (
    <section className={styles.wordList}>
      {words.map((w) => (
        <WordLink key={w} word={w} />
      ))}
    </section>
  )
}

export async function getStaticProps() {
  return {
    props: { words: getWordsOnPage(1, 666) },
    revalidate: 30,
  }
}
