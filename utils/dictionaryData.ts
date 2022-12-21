import { DictionaryEntry } from "./../types/DictionaryTypes"
import { SheetRow } from "../types/DictionaryTypes"
import PublicGoogleSheetsParser from "public-google-sheets-parser"

export const allWords = await (async () => {
  // https://docs.google.com/spreadsheets/d/1D1-LkiIjWox_cdvaCdYfzUaT0cnhDsHr_8pir0mlS58/edit#gid=1697954206
  const parser = new PublicGoogleSheetsParser(
    "1D1-LkiIjWox_cdvaCdYfzUaT0cnhDsHr_8pir0mlS58",
    "Words",
  )
  console.log("fetching from google sheets")

  const rows = (await parser.parse()) as SheetRow[]

  if (rows.length === 0) {
    console.error("Failed to get dictionary data!")
    return {}
  }

  const splitEntry = (entry?: string) =>
    (entry ?? "")
      .split("\n") // Delimiter for entries in one spreadsheet cell
      .filter((e) => e) // Remove empty lines

  const entries = {} as { [word: string]: DictionaryEntry[] }
  for (const row of rows) {
    const word = row.word ?? ""
    const entry = {
      word,
      partOfSpeech: row.partOfSpeech ?? "",
      pronunciations: splitEntry(row.pronunciations),
      glosses: splitEntry(row.glosses),
      examples: splitEntry(row.examples),
      notes: splitEntry(row.notes),
      alternateForms: splitEntry(row.alternateForms),
    }

    if (!entries[word]) {
      entries[word] = []
    }

    entries[word].push(entry)
  }

  return entries
})()

const wordsOnly = Object.keys(allWords)
export function getWordsOnPage(pageNum: number, wordsPerPage: number) {
  const startIndex = Math.min(
    (pageNum - 1) * wordsPerPage,
    wordsOnly.length - 1,
  )
  return wordsOnly.slice(startIndex, startIndex + wordsPerPage)
}

export function getWord(searchWord: string) {
  // Remove any whitespace since whitespace might be added for words starting
  // with special characters to prevent it messing with the path.
  const searchWordTrimmed = searchWord.trim()

  if (searchWordTrimmed in allWords) {
    return allWords[searchWordTrimmed]
  }
  return new Error("Word not found")
}
