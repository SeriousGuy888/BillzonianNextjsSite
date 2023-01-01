import { observer, useLocalObservable } from "mobx-react-lite"
import Head from "next/head"
import { useEffect } from "react"
import Guess from "../../modules/wordle/Guess"
import Qwerty from "../../modules/wordle/Qwerty"
import styles from "../../modules/wordle/Wordle.module.scss"
import WordleStore from "../../modules/wordle/WordleStore"

export type WordleColour = "" | "grey" | "yellow" | "green"

export default observer(function Wordle() {
  const store = useLocalObservable(() => WordleStore)

  useEffect(() => {
    store.init()

    window.addEventListener("keyup", store.handleKeyUp)
    return () => {
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
        <p>word: {store.word}</p>
        <p>curr guess: {store.currGuessIndex}</p>

        {store.guesses.map((_, i) => (
          <Guess
            key={i.toString()}
            word={store.word}
            guess={store.guesses[i]}
            isSubmitted={store.currGuessIndex > i}
          />
        ))}

        {store.won && "Thu vikked!"}
        {store.lost && "Thu misvikked!"}

        <Qwerty store={store} />
      </section>
    </>
  )
})
