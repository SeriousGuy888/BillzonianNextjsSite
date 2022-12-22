import Link from "next/link"
import { NextPage } from "next/types"
import { ChangeEvent, useState } from "react"
import styles from "../../../styles/Search.module.scss"
import { DictionaryEntry } from "../../../types/DictionaryTypes"
import { SearchIcon } from "../../svgs/icons"

interface PageProps {
  placeholder: string
  data: DictionaryEntry[][]
}

const SearchBar: NextPage<PageProps> = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState<DictionaryEntry[][]>([])

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase()

    if (searchTerm.trim() === "") {
      setFilteredData([])
      return
    }

    const newFilter = data.filter((e) =>
      e[0].word.toLowerCase().includes(searchTerm),
    )

    setFilteredData(newFilter)
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchInputs}>
        <SearchIcon className={styles.searchIcon} />
        <input type="text" placeholder={placeholder} onChange={handleFilter} />
      </div>
      {filteredData.length !== 0 && (
        <div className={styles.dataResults}>
          {filteredData.slice(0, 16).map((value) => (
            <Link
              key={value[0].word}
              className={styles.dataItem}
              href={`/words/${value[0].word}`}
            >
              <p>{value[0].word}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
