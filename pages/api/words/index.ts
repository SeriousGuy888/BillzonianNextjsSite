import { NextApiRequest, NextApiResponse } from "next"
import { getWord, cachedWordData } from "../../../utils/dictionaryData"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchTerm = (req.query.q?.toString() ?? "").trim()

  if (!searchTerm) {
    res.status(200).json(cachedWordData)
  } else {
    const foundWord = getWord(searchTerm)
    res.status(foundWord instanceof Error ? 404 : 200).json(foundWord)
  }
}
