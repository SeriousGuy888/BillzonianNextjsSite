import { NextApiRequest, NextApiResponse } from "next"
import dictionaryData from "../../../utils/dictionaryData"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const foundWord = dictionaryData.find((e) => e.word === req.query.word)
  
  if (foundWord) {
    res.status(200).json(foundWord)
  } else {
    res.status(404).send("Word not found.")
  }
}
