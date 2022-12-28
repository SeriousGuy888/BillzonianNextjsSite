import { NextApiRequest, NextApiResponse } from "next"
import { getWord } from "../../../../utils/dictionaryData"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const queryWord = (req.query.q?.toString() ?? "").trim()
  const foundWord = getWord(queryWord)
  res.status(foundWord instanceof Error ? 404 : 200).json(foundWord)
}
