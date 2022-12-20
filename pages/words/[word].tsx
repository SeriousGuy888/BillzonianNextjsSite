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
            <article key={i}>
              <p>Entry {i + 1}</p>
              <h3>{entry.partOfSpeech}</h3>
              <ol>
                {entry.glosses.map((gloss, j) => (
                  <li key={j}>{gloss}</li>
                ))}
              </ol>
              <ol>
                {entry.examples.map((example, j) => (
                  <li key={j}>{example}</li>
                ))}
              </ol>
              <ul>
                {entry.notes.map((note, j) => (
                  <li key={j}>{note}</li>
                ))}
              </ul>
              <p>
                Also spelled as{" "}
                {entry.alternateForms.map((altForm, j) => (
                  <Link key={j} href={`/words/${altForm}`}>
                    <span>{altForm}</span>
                  </Link>
                ))}
              </p>
            </article>
          )
        })}
      </>
    </section>
  )
}
