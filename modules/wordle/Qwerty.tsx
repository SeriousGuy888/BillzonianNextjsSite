import { NextPage } from "next"
import WordleStore from "./WordleStore"
import styles from "../../modules/wordle/Wordle.module.scss"
import { WordleColour } from "../../pages/wordle"
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined"
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined"

const Qwerty: NextPage<{ store: typeof WordleStore }> = ({ store }) => {
  const bksp = "B"
  const enter = "E"
  const keyboardLayout = ["qwertyuiop", "asdfghjkl", `${bksp}zxcvbnm${enter}`]

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

            let keyToPress = letter
            let contents: React.ReactNode = letter
            let isWideKey = false
            if (letter === bksp) {
              keyToPress = "Backspace"
              contents = <BackspaceOutlinedIcon />
              isWideKey = true
            }
            if (letter === enter) {
              keyToPress = "Enter"
              contents = <CheckOutlinedIcon />
              isWideKey = true
            }

            return (
              <div
                key={letter}
                className={`${styles.keyboardKey} ${styles[keyCol]} ${
                  isWideKey ? styles.wideKey : ""
                }`}
                onClick={() => store.pressKey(keyToPress)}
              >
                {contents}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Qwerty
