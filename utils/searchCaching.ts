import { getAllWordsAsSearchables } from "./dictionaryData"
import fs from "fs"
import path from "path"
import { getAllPostsAsSearchables } from "./posts"

export interface SearchableItem {
  linkPath: string
  title: string
  searchableText: string // the string that the search term will be compared against
}

interface SearchCache {
  timestamp: EpochTimeStamp
  items: SearchableItem[]
}

const searchCacheTtl = 1000 * 60 * 5 // 5 minutes
const cachePath = path.resolve(`./cache/search.json`)

export const getSearchCache = async (): Promise<SearchableItem[]> => {
  if (fs.existsSync(cachePath)) {
    const fileContents = fs.readFileSync(cachePath, { encoding: "utf8" })
    const cache = JSON.parse(fileContents) as SearchCache

    if (Date.now() - cache.timestamp < searchCacheTtl) {
      return cache.items
    }
    return updateSearchCache()
  } else {
    return updateSearchCache()
  }
}

const updateSearchCache = (): SearchableItem[] => {
  const items: SearchableItem[] = []
  items.push(...getAllPostsAsSearchables())
  items.push(...getAllWordsAsSearchables())

  const jsonString = JSON.stringify({
    timestamp: Date.now(),
    items,
  } as SearchCache)

  if (!fs.existsSync(path.dirname(cachePath))) {
    fs.mkdir(path.dirname(cachePath), (err) => {
      console.log("Failed to create cache directory:", err)
    })
  }

  fs.writeFile(cachePath, jsonString, (err) => {
    if (err) {
      console.log("Error writing file", err)
    } else {
      console.log(`Successfully wrote file to ${cachePath}`)
    }
  })

  return items
}
