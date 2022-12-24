import Link from "next/link"
import { NextPage } from "next/types"
import { ChangeEvent, useState } from "react"
import styles from "../../../styles/Search.module.scss"
import SearchIcon from "@mui/icons-material/SearchRounded"
// import { SearchableItem } from "../../../utils/searchDataAggregator"

interface PageProps {
  // placeholder: string
  // data: SearchableItem[]
}

const SearchBar: NextPage<PageProps> = ({  }) => {
  // const [filteredData, setFilteredData] = useState<SearchableItem[]>([])

  // const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
  //   const searchTerm = event.target.value.toLowerCase()

  //   if (searchTerm.trim() === "") {
  //     setFilteredData([])
  //     return
  //   }

  //   const newFilter = data.filter((e) =>
  //     e.searchableText.includes(searchTerm),
  //   )

  //   setFilteredData(newFilter)
  // }

  // return (
  //   <div className={styles.search}>
  //     <div className={styles.searchInputs}>
  //       <SearchIcon className={styles.searchIcon} />
  //       <input type="text" placeholder={placeholder} onChange={handleFilter} />
  //     </div>
  //     {filteredData.length !== 0 && (
  //       <div className={styles.dataResults}>
  //         {filteredData.slice(0, 16).map((item) => (
  //           <Link
  //             className={styles.dataItem}
  //             key={item.linkPath}
  //             href={item.linkPath}
  //           >
  //             <p>{item.title}</p>
  //           </Link>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // )

  return <></>
}



export default SearchBar
