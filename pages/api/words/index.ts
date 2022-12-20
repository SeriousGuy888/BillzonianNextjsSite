import { NextApiRequest, NextApiResponse } from "next"
import { allWords } from "../../../utils/dictionaryData"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(allWords)
}
