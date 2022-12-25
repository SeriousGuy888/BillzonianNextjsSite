import { SearchableItem } from "./../../utils/searchCaching"
import { NextApiRequest, NextApiResponse } from "next"
import { getSearchCache } from "../../utils/searchCaching"

export type SearchResult = Omit<SearchableItem, "searchableText">
interface SearchResultData {
  results: SearchResult[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResultData>,
) {
  const searchTerm = (req.query.q?.toString() ?? "").trim()

  if (!searchTerm) {
    res.status(400).json({ results: [] })
  }

  const cache = getSearchCache()
  const results: SearchResult[] = []
  cache.forEach((item) => {
    if (!item.searchableText.includes(searchTerm)) return

    results.push({
      title: item.title,
      linkPath: item.linkPath,
    })
  })

  res.status(200).json({ results })
}
