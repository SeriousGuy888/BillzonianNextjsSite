import csv from "csvtojson"
import { DictionaryEntry } from "../types/DictionaryTypes"

export const entries = await (async () => {
  const response = await fetch(
    "https://seriousguy888.github.io/Billzonian/vocabulary.csv",
  )

  if (!response.ok) {
    return []
  }

  const rawText = await response.text()
  const jsonData: DictionaryEntry[] = await csv({
    output: "json",
  }).fromString(rawText)

  return jsonData
})()

export function getWord(searchWord: string) {
  const foundWord = entries.find((e) => e.word === searchWord)

  if (foundWord) {
    return foundWord
  }
  return new Error("Word not found")
}
