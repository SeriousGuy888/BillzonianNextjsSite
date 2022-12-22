import { getWordsOnPage } from "../../utils/dictionaryData"
import WordLink from "../../components/elements/wordlist/WordLink"
import styles from "../../styles/Wordlist.module.scss"
import { motion } from "framer-motion"
import Head from "next/head"

export default function Words({ words }: { words: string[] }) {
  return (
    <>
      <Head>
        <title>Billzonian Dictionary</title>
      </Head>
      <motion.section
        className={styles.wordList}
        initial={{ y: 25 }}
        animate={{ y: 0 }}
      >
        {words.map((w) => (
          <WordLink key={w} word={w} />
        ))}
      </motion.section>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { words: getWordsOnPage(1, 666) },
    revalidate: 30,
  }
}
