import { getWord, padWord, uniqueWordsList } from "../../utils/dictionaryData"
import styles from "../../styles/Word.module.scss"

import Head from "next/head"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { DictionaryEntry } from "../../types/DictionaryTypes"
import WordEntry from "../../components/elements/wordlist/WordEntry"

const Word: NextPage<{
  entries?: DictionaryEntry[]
  word: string
}> = (props) => {
  const { word, entries } = props

  if (!entries?.length) {
    return (
      <>
        <Head>
          <title>Word not found</title>
        </Head>
        <h3>Word not found</h3>
      </>
    )
  }

  const title = `${word} - Billzonian`
  return (
    <>
      <Head>
        <title>{title}</title>

        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content={
            entries[0].glosses.map((g, i) => `${i + 1}. ${g}`).join("\n") +
            "\n\n..."
          }
        />
      </Head>

      <section className={styles.main}>
        <h1>{word}</h1>
        <article className={styles.twoCols}>
          <div className={styles.entriesCol}>
            {entries.map((entry, i) => (
              <WordEntry key={entry.glosses[0]} entry={entry} entryIndex={i} />
            ))}
          </div>
          {entries.some((entry) => entry.etymology) && (
            <div className={styles.etymologyCol}>
              <h3>Etymology</h3>
              {entries
                .filter((e) => e.etymology)
                .map((entry, i) => (
                  <p key={i}>{entry.etymology}</p>
                ))}
            </div>
          )}
        </article>
      </section>
    </>
  )
}

export const getStaticProps: GetStaticProps = (context) => {
  const searchWord = context.params?.word?.toString() ?? ""
  const foundWord = getWord(searchWord)

  let entries = foundWord
  if (foundWord instanceof Error) {
    entries = []
  }

  return {
    props: { word: searchWord, entries },
    revalidate: 30,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = uniqueWordsList.map((word) => ({
    params: {
      word: padWord(word),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Word
