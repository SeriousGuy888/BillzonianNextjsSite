import { DictionaryEntry } from "./../../../types/DictionaryTypes"
import { getCache } from "../../../utils/cacheManager"
import { NextApiRequest, NextApiResponse } from "next"

interface SearchResultData {
  results: DictionaryEntry[][]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResultData>,
) {
  const searchTerm = (req.query.q?.toString() ?? "").trim()

  if (!searchTerm) {
    res.status(400).json({ results: [] })
    return
  }

  const cache = getCache<DictionaryEntry[]>("words")
  const results = cache.filter((entries) => {
    return entries.some(
      (entry) =>
        entry.word.includes(searchTerm) ||
        entry.glosses.includes(searchTerm) ||
        entry.alternateForms.includes(searchTerm),
    )
  })

  res.status(200).json({ results })
}
