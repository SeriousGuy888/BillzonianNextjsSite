import { NextApiRequest, NextApiResponse } from "next"
import { getWord } from "../../../utils/dictionaryData"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const searchWord = req.query.word?.toString() ?? ""
  const foundWord = getWord(searchWord)

  res.status(foundWord instanceof Error ? 404 : 200).json(foundWord)
}
