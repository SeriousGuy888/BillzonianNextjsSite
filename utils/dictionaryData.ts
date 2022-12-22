import { getUpdatedData, lastDataUpdate } from "./fetchGoogleSheet"

const wordDataTtlMs = 1000 * 60
export let allWords = await getUpdatedData()

export const uniqueWordsList = Object.keys(allWords)
export function getWordsOnPage(pageNum: number, wordsPerPage: number) {
  const startIndex = Math.min(
    (pageNum - 1) * wordsPerPage,
    uniqueWordsList.length - 1,
  )
  return uniqueWordsList.slice(startIndex, startIndex + wordsPerPage)
}

/**
 * Add space to start if word begins with a period because the period
 * can mess with the routing D:
 */
export function sanitiseWord(word: string) {
  if (word.startsWith(".")) {
    return ` ${word}`
  }
  return word
}
export async function getWord(searchWord: string) {
  if (Date.now() - lastDataUpdate > wordDataTtlMs) {
    allWords = await getUpdatedData()
  }

  // Remove any whitespace since whitespace might be added for words starting
  // with special characters to prevent it messing with the path.
  const searchWordTrimmed = searchWord.trim()

  if (searchWordTrimmed in allWords) {
    return allWords[searchWordTrimmed]
  }
  return new Error("Word not found")
}
