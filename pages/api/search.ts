import { getCache } from "../../utils/searchCaching"
import { NextApiRequest, NextApiResponse } from "next"

export interface SearchableItem {
  linkPath: string
  title: string
  searchableText: string // the string that the search term will be compared against
}

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

  const cache = getCache<SearchableItem>("search")
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
