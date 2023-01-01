import { NextPage } from "next"
import styles from "../../modules/wordle/Wordle.module.scss"
import { WordleColour } from "../../pages/wordle"

interface PageProps {
  word: string
  wordLength: number,
  guess?: string
  isSubmitted: boolean
}

const Guess: NextPage<PageProps> = ({ word, wordLength, guess, isSubmitted }) => {
  return (
    <div className={styles.row}>
      {new Array(wordLength).fill(null).map((_, i) => {
        const letter = guess?.[i] ?? ""

        let cellColourClass: WordleColour = ""
        if (isSubmitted) {
          if (!word.includes(letter)) {
            cellColourClass = "grey"
          } else {
            cellColourClass = word[i] === letter ? "green" : "yellow"
          }
        }

        const delay = `${i * 100}ms`
        return (
          <div
            key={i.toString()}
            className={`${styles.cell} ${
              cellColourClass && styles[cellColourClass]
            }`}
            style={{ animationDelay: delay, transitionDelay: delay }}
          >
            {letter}
          </div>
        )
      })}
    </div>
  )
}

export default Guess
