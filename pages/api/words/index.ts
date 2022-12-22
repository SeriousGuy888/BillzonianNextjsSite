import { NextApiRequest, NextApiResponse } from "next"
import { allWordData } from "../../../utils/dictionaryData"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(200).json(allWordData)
}
