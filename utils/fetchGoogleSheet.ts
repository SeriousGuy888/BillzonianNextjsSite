import { DictionaryEntry, WordCollection } from "./../types/DictionaryTypes"
import { DictionaryRow } from "../types/DictionaryTypes"
import PublicGoogleSheetsParser from "public-google-sheets-parser"

export let lastDataUpdate: EpochTimeStamp = 0
export const getUpdatedData = async (): Promise<WordCollection> => {
  // https://docs.google.com/spreadsheets/d/1D1-LkiIjWox_cdvaCdYfzUaT0cnhDsHr_8pir0mlS58/edit#gid=1697954206
  const parser = new PublicGoogleSheetsParser(
    "1D1-LkiIjWox_cdvaCdYfzUaT0cnhDsHr_8pir0mlS58",
    "Words",
  )
  console.log("fetching from google sheets")

  const rows = (await parser.parse()) as DictionaryRow[]

  if (rows.length === 0) {
    console.error("Failed to get dictionary data!")
    return {}
  }

  const splitEntry = (entry?: string) =>
    (entry ?? "")
      .split("\n") // Delimiter for entries in one spreadsheet cell
      .filter((e) => e) // Remove empty lines

  const entries = {} as WordCollection
  for (const row of rows) {
    const word = row.word ?? ""
    const entry: DictionaryEntry = {
      partOfSpeech: row.partOfSpeech ?? "",
      pronunciations: splitEntry(row.pronunciations),
      glosses: splitEntry(row.glosses),
      examples: splitEntry(row.examples),
      notes: splitEntry(row.notes),
      alternateForms: splitEntry(row.alternateForms),
      etymology: row.etymology ?? null,
    }

    if (!entries[word]) {
      entries[word] = []
    }

    entries[word].push(entry)
  }

  lastDataUpdate = Date.now()
  return entries
}
