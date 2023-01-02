import words from "./words.json"

let state = {
  word: "",
  guesses: [] as string[],
  currGuessIndex: 0,

  wordLength: 5,
  guessLimit: 6,

  get won(): boolean {
    return this.guesses[this.currGuessIndex - 1] === this.word
  },
  get lost(): boolean {
    return !this.won && this.currGuessIndex >= this.guessLimit
  },
  get guessedLettersAll(): string[] {
    return this.guesses.slice(0, this.currGuessIndex).join("").split("")
  },
  get guessedLettersYellow(): string[] {
    return this.word
      .split("")
      .filter((letter) => this.guessedLettersAll.includes(letter))
  },
  get guessedLettersGreen(): string[] {
    return this.word.split("").filter((letter, i) =>
      this.guesses
        .slice(0, this.currGuessIndex)
        .map((word) => word[i])
        .includes(letter),
    )
  },
  init() {
    this.word = words[Math.floor(Math.random() * words.length)]
    this.currGuessIndex = 0

    this.wordLength = this.word.length
    this.guessLimit = this.wordLength + 1
    this.guesses = new Array(this.guessLimit).fill("")
  },
  giveUp() {
    this.currGuessIndex = this.guessLimit
  },
  submitGuess() {
    this.currGuessIndex++
  },
  handleKeyUp(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey) {
      return
    }

    if (event.key === "Enter" || event.key === "Backspace") {
      this.pressKey(event.key)
      return
    }

    if (
      this.guesses[this.currGuessIndex].length < this.wordLength &&
      event.key.length === 1 &&
      event.key.toLowerCase().match(/[a-z]/)
    ) {
      this.pressKey(event.key.toLowerCase())
    }
  },
  pressKey(key: string) {
    if (this.won || this.lost) {
      return
    }
    
    switch (key) {
      case "Enter":
        if (this.guesses[this.currGuessIndex].length === this.wordLength) {
          this.submitGuess()
        }
        break
      case "Backspace":
        const currGuess = this.guesses[this.currGuessIndex]
        this.guesses[this.currGuessIndex] = currGuess.slice(
          0,
          currGuess.length - 1,
        )
        break
      default: // should only ever be /[a-z]/
        this.guesses[this.currGuessIndex] += key.toLowerCase()
        break
    }
  },
}

export default state
