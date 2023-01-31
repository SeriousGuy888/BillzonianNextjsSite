import { cachedWordData, uniqueWordsList } from "../../../utils/dictionaryData"
import { WordCollection } from "../../../types/DictionaryTypes"
import { NextApiRequest, NextApiResponse } from "next"
import { didYouMean } from "../../../utils/similarStringFinder"

interface SearchResultData {
  results: WordCollection
  similarWords?: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResultData>,
) {
  const searchTerm = (req.query.q?.toString() ?? "").trim().toLowerCase()

  if (!searchTerm) {
    res.status(400).json({ results: {} })
    return
  }

  const results = Object.entries(cachedWordData).filter(
    ([wordName, wordData]) =>
      wordName.includes(searchTerm) ||
      wordData.some(
        (entry) =>
          entry.glosses.join(" ").includes(searchTerm) ||
          entry.alternateForms.join(" ").includes(searchTerm),
      ),
  )

  if (!results.length) {
    const similarWords = didYouMean(searchTerm, uniqueWordsList, 10)
    res.status(404).json({ results: {}, similarWords })
    return
  }

  res.status(200).json({ results: Object.fromEntries(results) })
}
