import { NextPage } from "next"
import { useRouter } from "next/router"
import { getSearchCache, SearchableItem } from "../../utils/searchCaching"

const Search: NextPage<{ searchItems: SearchableItem[] }> = ({
  searchItems,
}) => {
  const { query } = useRouter()

  const searchTerm = query.q?.toString()?.toLowerCase() ?? ""
  const results: SearchableItem[] = []

  searchItems.forEach((item) => {
    if (item.searchableText.includes(searchTerm)) {
      results.push(item)
    }
  })

  return (
    <div>
      {results.length > 0 ? (
        results.map((item, index) => <p key={index}>{item.title}</p>)
      ) : (
        <div>
          <h1>{query.q ? `No posts found for ${query.q} ` : "Loading..."}</h1>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const searchItems = await getSearchCache()

  return {
    props: {
      searchItems,
    },
  }
}

export default Search
