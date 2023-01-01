import { NextPage } from "next"
import WordleStore from "./WordleStore"
import styles from "../../modules/wordle/Wordle.module.scss"
import { WordleColour } from "../../pages/wordle"

const Qwerty: NextPage<{ store: typeof WordleStore }> = ({ store }) => {
  const keyboardLayout = ["qwertyuiop", "asdfghjkl", "←zxcvbnm✓"]

  return (
    <div className={styles.keyboard}>
      {keyboardLayout.map((row) => (
        <div key={row} className={styles.keyboardRow}>
          {row.split("").map((letter, i) => {
            let keyCol: WordleColour = ""
            if (store.guessedLettersAll.includes(letter)) {
              keyCol = "grey"
            }
            if (store.guessedLettersYellow.includes(letter)) {
              keyCol = "yellow"
            }
            if (store.guessedLettersGreen.includes(letter)) {
              keyCol = "green"
            }

            return (
              <div
                key={letter}
                className={`${styles.keyboardKey} ${styles[keyCol]}`}
              >
                {letter}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Qwerty
