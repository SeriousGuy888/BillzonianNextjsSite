import { cachedWordData } from "../../../utils/dictionaryData"
import { WordCollection } from "../../../types/DictionaryTypes"
import { NextApiRequest, NextApiResponse } from "next"

interface SearchResultData {
  results: WordCollection
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResultData>,
) {
  const searchTerm = (req.query.q?.toString() ?? "").trim()

  if (!searchTerm) {
    res.status(400).json({ results: {} })
    return
  }

  const results = Object.entries(cachedWordData).filter(
    ([wordName, wordData]) =>
      wordName.includes(searchTerm) ||
      wordData.some(
        (entry) =>
          entry.glosses.includes(searchTerm) ||
          entry.alternateForms.includes(searchTerm),
      ),
  )

  res.status(200).json({ results: Object.fromEntries(results) })
}
