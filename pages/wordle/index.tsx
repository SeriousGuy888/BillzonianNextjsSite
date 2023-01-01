import { observer, useLocalObservable } from "mobx-react-lite"
import Head from "next/head"
import { useCallback, useEffect, useRef } from "react"
import WordLink from "../../components/elements/wordlist/WordLink"
import Guess from "../../modules/wordle/Guess"
import Qwerty from "../../modules/wordle/Qwerty"
import styles from "../../modules/wordle/Wordle.module.scss"
import WordleStore from "../../modules/wordle/WordleStore"

export type WordleColour = "" | "grey" | "yellow" | "green"

export default observer(function Wordle() {
  const store = useLocalObservable(() => WordleStore)

  const preventEnter = useCallback((e: KeyboardEvent) => {
    if (e.key === "Enter") e.preventDefault()
  }, [])

  useEffect(() => {
    store.init()

    window.addEventListener("keydown", preventEnter)
    window.addEventListener("keyup", store.handleKeyUp)
    return () => {
      window.removeEventListener("keydown", preventEnter)
      window.removeEventListener("keyup", store.handleKeyUp)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Head>
        <title>Unkrat Wordle</title>
      </Head>
      <section className={styles.game}>
        <h3>Unkrat Wordle</h3>
        <p>(Guesses don&apos;t have to be valid Billzonian words)</p>
        <br />

        {store.guesses.map((_, i) => (
          <Guess
            key={i.toString()}
            word={store.word}
            wordLength={store.wordLength}
            guess={store.guesses[i]}
            isSubmitted={store.currGuessIndex > i}
          />
        ))}

        {store.won && <p>Thu hav vikked! 🎉</p>}
        {store.lost && (
          <p>
            Thu hav misvikked. Akrat word{" "}
            <WordLink word={store.word}>{store.word.toUpperCase()}</WordLink> beed. 😔
          </p>
        )}

        <Qwerty store={store} />
      </section>
    </>
  )
})
