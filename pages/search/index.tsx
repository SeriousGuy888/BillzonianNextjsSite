import Link from "next/link"
import React, { useCallback, useRef, useState } from "react"
import { SearchResult } from "../api/search"
import SearchIcon from "@mui/icons-material/SearchRounded"
import styles from "../../styles/Search.module.scss"

const Search = () => {
  const searchBoxRef = useRef(
    null,
  ) as React.MutableRefObject<HTMLInputElement | null>

  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])

  const searchEndpoint = (query: string) => `/api/search?q=${query}`

  const runSearch = useCallback(() => {
    if (query.length) {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          setResults(res.results)
        })
    } else {
      setResults([])
    }
  }, [query])

  return (
    <section className={styles.search} ref={searchBoxRef}>
      <form
        className={styles.searchInputs}
        onSubmit={(e) => {
          e.preventDefault()
          runSearch()
        }}
      >
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search for words and posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
      </form>
      {results.length > 0 ? (
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
      ) : (
        <p>No Results. Enter search term and press enter to search.</p>
      )}
    </section>
  )
}

export default Search
