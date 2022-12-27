import { SearchableItem } from "../pages/api/search"
import { getUpdatedData, lastDataUpdate } from "./fetchGoogleSheet"

const wordDataTtlMs = 1000 * 60
export let allWordData = await getUpdatedData()
export let uniqueWordsList = Object.keys(allWordData)

async function updateWordsData() {
  allWordData = await getUpdatedData()
  uniqueWordsList = Object.keys(allWordData)
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
export function sanitiseWord(word: string) {
  if (word.startsWith(".")) {
    return ` ${word}`
  }
  return word
}
export async function getWord(searchWord: string) {
  if (Date.now() - lastDataUpdate > wordDataTtlMs) {
    updateWordsData()
  }

  const searchWordTrimmed = searchWord.trim()

  if (searchWordTrimmed in allWordData) {
    return allWordData[searchWordTrimmed]
  }
  return []
}

export const getAllWordsAsSearchables = (): SearchableItem[] => {
  const words = allWordData
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
      linkPath: `words/${sanitiseWord(wordName)}`,
      title: wordName,
      searchableText,
    })
  }

  return items
}
