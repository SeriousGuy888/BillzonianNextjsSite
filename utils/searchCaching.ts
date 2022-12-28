import { getAllWordsAsSearchables } from "./dictionaryData"
import { getAllPostsAsSearchables } from "./posts"
import { SearchableItem } from "../pages/api/search"

interface SearchCache {
  timestamp: EpochTimeStamp
  items: SearchableItem[]
}

const ttlMs = 1000 * 60 * 5
let cache: SearchCache = {
  timestamp: 0,
  items: [],
}

export const getSearchCache = () => {
  if (Date.now() - cache.timestamp < ttlMs) {
    return cache.items
  }

  return updateSearchCache()
}

const updateSearchCache = () => {
  let items: SearchableItem[] = []
  items.push(...getAllPostsAsSearchables())
  items.push(...getAllWordsAsSearchables())

  cache = {
    timestamp: Date.now(),
    items,
  }

  console.log(`Updated search cache. ${new Date().toISOString()}`)

  return items
}
