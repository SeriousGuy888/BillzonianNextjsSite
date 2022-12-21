import { useRouter } from "next/router"
import { getWord } from "../../utils/dictionaryData"
import styles from "../../styles/Word.module.scss"

import { Noto_Sans } from "@next/font/google"
import Link from "next/link"
const notoSans = Noto_Sans({ weight: "400" })

export default function Word() {
  const router = useRouter()
  const { word } = router.query
  const entries = getWord(word?.toString() ?? "")

  if (entries instanceof Error) {
    return <p>Word not found.</p>
  }

  return (
    <section className={styles.main}>
      <>
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

              <p>
                {entry.pronunciations.map((pronunciation) => (
                  <span
                    key={pronunciation}
                    className={styles.ipaReading}
                    style={notoSans.style}
                  >
                    {pronunciation}
                  </span>
                ))}
              </p>
              {entry.alternateForms.length > 0 && (
                <p>
                  Also spelled as{" "}
                  {entry.alternateForms.map((altForm) => (
                    <Link key={altForm} href={`/words/${altForm}`}>
                      <span>{altForm}</span>
                    </Link>
                  ))}
                </p>
              )}
            </article>
          )
        })}
      </>
    </section>
  )
}
