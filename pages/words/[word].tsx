import {
  allWords,
  getWord,
  sanitiseWord,
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

const Word: NextPage<{
  entries?: DictionaryEntry[]
  word: string
}> = (props) => {
  const { word, entries } = props

  const head = (
    <Head>
      <title>{`${word} - Billzonian`}</title>
    </Head>
  )

  if (!entries?.length) {
    return (
      <>
        {head} <h3>Word not found.</h3>
      </>
    )
  }

  return (
    <>
      {head}
      <section className={styles.main}>
        <h1>{word}</h1>
        {entries.map((entry, i) => {
          return (
            <article key={entry.glosses[0]} className={styles.entry}>
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
            </article>
          )
        })}
      </section>
    </>
  )
}

const wordExists = (word: string) => {
  return word in allWords
}

export const getStaticProps: GetStaticProps = async (context) => {
  const searchWord = context.params?.word?.toString() ?? ""
  const foundWord = await getWord(searchWord)

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
      word: sanitiseWord(word),
    },
  }))

  return {
    paths,
    fallback: true,
  }
}

export default Word
