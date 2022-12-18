import { useRouter } from "next/router"
import { getWord } from "../../utils/dictionaryData"
import styles from "../../styles/Word.module.scss"

import { Noto_Sans } from "@next/font/google"
import Link from "next/link"
const notoSans = Noto_Sans({ weight: "400" })

export default function Word() {
  const router = useRouter()
  const { word } = router.query
  const entry = getWord(word?.toString() ?? "")

  if (entry instanceof Error) {
    return <main>Word not found.</main>
  }

  return (
    <main className={styles.main}>
      <section className={styles.entryWord}>
        <h1>{entry.word}</h1>
        <p className={notoSans.className}>
          {entry.pronunciations.map((pronunciation, index) => (
            <span className={styles.ipaReading} key={index}>
              /{pronunciation}/
            </span>
          ))}
        </p>
        <br />
        <p>Also spelled
          {entry.alternateForms.map((alt, index) => (
            <Link href={`/words/${alt}`} key={index}>
              {alt}
            </Link>
          ))}
        </p>
      </section>
      <section>
        <ol>
          {entry.glosses.map((trans, index) => (
            <li key={index}>{trans}</li>
          ))}
        </ol>
      </section>
      <section>
        <ol className={styles.letterList}>
          {entry.examples.map((examp, index) => (
            <li key={index}>{examp}</li>
          ))}
        </ol>
      </section>
      <section>
        <ul>
          {entry.notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
      </section>
    </main>
  )
}
