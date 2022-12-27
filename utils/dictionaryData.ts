import { Word } from "./../types/DictionaryTypes"
import { SearchableItem } from "../pages/api/search"
import { getUpdatedData, lastDataUpdate } from "./fetchGoogleSheet"

const wordDataTtlMs = 1000 * 60 * 2.5

export let cachedWordData = await getUpdatedData()
export let uniqueWordsList = Object.keys(cachedWordData)
async function updateWordsData() {
  cachedWordData = await getUpdatedData()
  uniqueWordsList = Object.keys(cachedWordData)
}

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
export function padWord(word: string) {
  if (word.startsWith(".")) {
    return " " + word
  }
  return word
}

export function getWord(searchWord: string): Word {
  if (Date.now() - lastDataUpdate > wordDataTtlMs) {
    updateWordsData()
  }

  // Remove any whitespace since whitespace might be added for words starting
  // with special characters to prevent it messing with the path.
  const searchWordTrimmed = searchWord.trim()

  if (searchWordTrimmed in cachedWordData) {
    return cachedWordData[searchWordTrimmed]
  }
  return []
}

export const getAllWordsAsSearchables = (): SearchableItem[] => {
  const words = cachedWordData
  const items: SearchableItem[] = []

  for (const wordName in words) {
    const entries = words[wordName]

    let searchableText = `${wordName}`
    entries.forEach((entry) => {
      searchableText += " " + entry.glosses.join(" ")
      searchableText += " " + entry.pronunciations.join(" ")
      searchableText += " " + entry.alternateForms.join(" ")
    })
    searchableText = searchableText.toLowerCase()

    items.push({
      linkPath: `words/${padWord(wordName)}`,
      title: wordName,
      searchableText,
    })
  }

  return items
}
