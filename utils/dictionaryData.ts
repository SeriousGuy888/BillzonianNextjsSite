import csv from "csvtojson"
import { DictionaryEntry } from "../types/DictionaryTypes"

export async function fetchDictionaryData() {
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
}

export default await fetchDictionaryData()
