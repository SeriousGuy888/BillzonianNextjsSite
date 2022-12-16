import { useRouter } from "next/router"
import { getWord } from "../../utils/dictionaryData"

export default function Word() {
  const router = useRouter()
  const { word } = router.query
  const entry = getWord(word?.toString() ?? "")

  return <>{JSON.stringify(entry)}</>
}
