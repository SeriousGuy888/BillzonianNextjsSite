import { Noto_Sans } from "@next/font/google"
import { motion } from "framer-motion"
import { NextPage } from "next"
import Link from "next/link"
import { DictionaryEntry } from "../../../types/DictionaryTypes"
import { cachedWordData } from "../../../utils/dictionaryData"
import styles from "../../../styles/Word.module.scss"
import WordEntryText from "./WordEntryText"
import WordLink from "./WordLink"

const notoSans = Noto_Sans({
  weight: "400",
  subsets: ["latin", "latin-ext"],
})

interface PageProps {
  entry: DictionaryEntry
  entryIndex: number
}

const WordEntry: NextPage<PageProps> = ({ entry, entryIndex }) => {
  return (
    <motion.article
      key={entry.glosses[0]}
      className={styles.entry}
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{ delay: entryIndex * 0.1 }}
    >
      <p className={styles.entryNumber}>Entry {entryIndex + 1}</p>

      <h3>{entry.partOfSpeech}</h3>

      <hr />

      {entry.glosses.length > 0 && (
        <ol>
          {entry.glosses.map((gloss) => (
            <li key={gloss}>
              <WordEntryText text={gloss} />
            </li>
          ))}
        </ol>
      )}
      {entry.examples.length > 0 && (
        <ol className={styles.letterList}>
          {entry.examples.map((example) => (
            <li key={example}>
              <WordEntryText text={example} />
            </li>
          ))}
        </ol>
      )}
      {entry.notes.length > 0 && (
        <ul>
          {entry.notes.map((note) => (
            <li key={note}>
              <WordEntryText text={note} />
            </li>
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
              <WordLink key={altForm} word={altForm} />
            ))}
          </span>
        </p>
      )}
    </motion.article>
  )
}

export default WordEntry
