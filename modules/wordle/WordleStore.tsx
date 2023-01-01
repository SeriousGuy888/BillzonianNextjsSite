let state = {
  word: "",
  guesses: [] as string[],
  currGuessIndex: 0,

  get won(): boolean {
    return this.guesses[this.currGuessIndex - 1] === this.word
  },
  get lost(): boolean {
    return this.currGuessIndex >= 6
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
    this.word = "akrat"
    this.guesses = new Array(6).fill("")
    this.currGuessIndex = 0
  },
  submitGuess() {
    this.currGuessIndex++
  },
  handleKeyUp(event: KeyboardEvent) {
    if (this.won || this.lost) {
      return
    }

    if (
      event.key === "Enter" &&
      this.guesses[this.currGuessIndex].length === 5
    ) {
      return this.submitGuess()
    }

    if (event.key === "Backspace") {
      const currGuess = this.guesses[this.currGuessIndex]
      this.guesses[this.currGuessIndex] = currGuess.slice(
        0,
        currGuess.length - 1,
      )
      return
    }

    if (
      this.guesses[this.currGuessIndex].length < 5 &&
      event.key.length === 1 &&
      event.key.toLowerCase().match(/[a-z]/)
    ) {
      this.guesses[this.currGuessIndex] += event.key.toLowerCase()
    }
  },
}

export default state
