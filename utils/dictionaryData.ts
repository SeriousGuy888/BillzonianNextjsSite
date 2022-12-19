import { DictionarySheetRow } from "../types/DictionaryTypes"
import PublicGoogleSheetsParser from "public-google-sheets-parser"

export const entries = await (async () => {
  // https://docs.google.com/spreadsheets/d/1D1-LkiIjWox_cdvaCdYfzUaT0cnhDsHr_8pir0mlS58/edit#gid=1697954206
  const parser = new PublicGoogleSheetsParser(
    "1D1-LkiIjWox_cdvaCdYfzUaT0cnhDsHr_8pir0mlS58",
    "Words",
  )
  const rows = (await parser.parse()) as DictionarySheetRow[]

  if (rows.length === 0) {
    console.error("Failed to get dictionary data!")
    return []
  }

  const splitEntry = (entry?: string) =>
    (entry ?? "")
      .split("\n") // Delimiter for entries in one spreadsheet cell
      .filter((e) => e) // Remove empty lines

  const entries = rows.map((row) => ({
    word: row.word ?? "",
    partOfSpeech: row.partOfSpeech ?? "",
    pronunciations: splitEntry(row.pronunciations),
    glosses: splitEntry(row.glosses),
    examples: splitEntry(row.examples),
    notes: splitEntry(row.notes),
    alternateForms: splitEntry(row.alternateForms),
  }))

  return entries
})()

export function getWord(searchWord: string) {
  const foundWord = entries.find((e) => e.word === searchWord)

  if (foundWord) {
    return foundWord
  }
  return new Error("Word not found")
}
