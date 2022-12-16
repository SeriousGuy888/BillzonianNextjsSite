import { DictionaryEntry } from "../../types/DictionaryTypes"
import { entries } from "../../utils/dictionaryData"

export default function Words({ entries }: { entries: DictionaryEntry[] }) {
  return (
    <>
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { entries },
    revalidate: 30,
  }
}
