import { NextApiRequest, NextApiResponse } from "next"
import { getWord, allWordData } from "../../../utils/dictionaryData"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchTerm = (req.query.q?.toString() ?? "").trim()

  if (!searchTerm) {
    res.status(200).json(allWordData)
  } else {
    const foundWord = await getWord(searchTerm)
    res.status(foundWord instanceof Error ? 404 : 200).json(foundWord)
  }
}
