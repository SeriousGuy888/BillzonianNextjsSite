import fs from "fs"
import path from "path"
import { getAllWordsAsSearchables } from "./dictionaryData"
import { getAllPostsAsSearchables } from "./posts"
import { SearchableItem } from "../pages/api/search"

interface SearchCache {
  timestamp: EpochTimeStamp
  items: SearchableItem[]
}

const ttl = 1000 * 60 * 5
const cachePath = path.resolve(`./cache/search.json`)

export const getCache = () => {
  if (fs.existsSync(cachePath)) {
    const fileContents = fs.readFileSync(cachePath, { encoding: "utf8" })
    const cache = JSON.parse(fileContents) as SearchCache

    if (Date.now() - cache.timestamp < ttl) {
      return cache.items
    }
  }

  return updateCache()
}

const updateCache = () => {
  let items: SearchableItem[] = []
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
