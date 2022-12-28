import { NextApiRequest, NextApiResponse } from "next"
import { getWordsOnPage } from "../../../utils/dictionaryData"
import { getParamAsInt } from "../../../utils/queryParamParser"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const pageNum = getParamAsInt(req.query.page, 1)
  const wordPerPage = getParamAsInt(req.query.perPage, 16)

  const wordsOnPage = getWordsOnPage(pageNum, wordPerPage)
  res.status(200).json(wordsOnPage)
}
