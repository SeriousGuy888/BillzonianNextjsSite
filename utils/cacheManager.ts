import fs from "fs"
import path from "path"
import { getAllWordsAsSearchables } from "./dictionaryData"
import { getAllPostsAsSearchables } from "./posts"

type CacheName = "search" | "words"
interface Cache<Type> {
  timestamp: EpochTimeStamp
  items: Type[]
}

const ttl = 1000 * 60 * 5
const getCachePath = (cacheName: CacheName) =>
  path.resolve(`./cache/${cacheName}.json`)

export const getCache = <Type>(cacheName: CacheName): Type[] => {
  const cachePath = getCachePath(cacheName)

  if (fs.existsSync(cachePath)) {
    const fileContents = fs.readFileSync(cachePath, { encoding: "utf8" })
    const cache = JSON.parse(fileContents) as Cache<Type>

    if (Date.now() - cache.timestamp < ttl) {
      return cache.items
    }
  }

  return updateCache(cacheName)
}

const updateCache = <Type>(cacheName: CacheName): Type[] => {
  const cachePath = getCachePath(cacheName)

  const items: Type[] = []

  switch (cacheName) {
    case "search":
      items.push(...(getAllPostsAsSearchables() as Type[]))
      items.push(...(getAllWordsAsSearchables() as Type[]))
      break
    case "words":
      items.push({} as Type)
  }

  const jsonString = JSON.stringify({
    timestamp: Date.now(),
    items,
  } as Cache<Type>)

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
