import { getWordsOnPage } from "../../utils/dictionaryData"

export default function Words({ words }: { words: string[] }) {
  return (
    <>
      <pre>{JSON.stringify(words, null, 2)}</pre>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: { words: getWordsOnPage(1, 20) },
    revalidate: 30,
  }
}
