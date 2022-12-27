import {
  cachedWordData,
  getWord,
  padWord,
  uniqueWordsList,
} from "../../utils/dictionaryData"
import styles from "../../styles/Word.module.scss"

import { Noto_Sans } from "@next/font/google"
import Link from "next/link"
import Head from "next/head"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { DictionaryEntry } from "../../types/DictionaryTypes"
const notoSans = Noto_Sans({
  weight: "400",
  subsets: ["latin", "latin-ext"],
})
import { motion } from "framer-motion"

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
        {entries.map((entry, i) => {
          return (
            <motion.article
              key={entry.glosses[0]}
              className={styles.entry}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <p className={styles.entryNumber}>Entry {i + 1}</p>

              <h3>{entry.partOfSpeech}</h3>

              <hr />

              {entry.glosses.length > 0 && (
                <ol>
                  {entry.glosses.map((gloss) => (
                    <li key={gloss}>{gloss}</li>
                  ))}
                </ol>
              )}
              {entry.examples.length > 0 && (
                <ol className={styles.letterList}>
                  {entry.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ol>
              )}
              {entry.notes.length > 0 && (
                <ul>
                  {entry.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}

              <hr />

              <p className={styles.pronunciationList}>
                {entry.pronunciations.map((pronunciation) => (
                  <span
                    key={pronunciation}
                    className={styles.ipaReading}
                    style={notoSans.style}
                  >
                    /{pronunciation}/
                  </span>
                ))}
              </p>
              {entry.alternateForms.length > 0 && (
                <p>
                  Alternate forms / spellings:{" "}
                  <span className={styles.altForms}>
                    {entry.alternateForms.map((altForm) => (
                      <span key={altForm}>
                        <Link
                          href={`/words/${altForm}`}
                          className={wordExists(altForm) ? "" : "redLink"}
                          title={
                            wordExists(altForm)
                              ? ""
                              : "This page does not exist."
                          }
                        >
                          {altForm}
                        </Link>
                      </span>
                    ))}
                  </span>
                </p>
              )}
            </motion.article>
          )
        })}
      </section>
    </>
  )
}

const wordExists = (word: string) => {
  return word in cachedWordData
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
