import Link from "next/link"
import React, {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
} from "react"
import { SearchableItem, SearchResult } from "../api/search"
import SearchIcon from "@mui/icons-material/SearchRounded"
import styles from "../../styles/Search.module.scss"
import { getCache } from "../../utils/searchCaching"

const Search = () => {
  const searchBoxRef = useRef(
    null,
  ) as React.MutableRefObject<HTMLInputElement | null>
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  const searchEndpoint = (query: string) => `/api/search?q=${query}`

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    setQuery(query)
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [])

  const onClick = useCallback((event: MouseEvent<HTMLInputElement>) => {
    if (
      searchBoxRef.current &&
      !searchBoxRef.current.contains(event.target as HTMLInputElement)
    ) {
      setQuery("")
      setResults([])
    }
  }, [])

  return (
    <section className={styles.search} ref={searchBoxRef}>
      <div className={styles.searchInputs}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for words and posts..."
          onChange={onChange}
          onClick={onClick}
          value={query}
          autoFocus
        />
      </div>
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.map((item) => (
            <div key={item.linkPath} className={styles.itemContainer}>
              <Link className={styles.item} href={item.linkPath}>
                <h3>{item.title}</h3>
                <p>{item.linkPath}</p>
              </Link>
            </div>
          ))}
        </ul>
      )}
    </section>
  )
}

export async function getStaticProps() {
  getCache<SearchableItem>("search")

  return {
    props: {},
  }
}

export default Search
