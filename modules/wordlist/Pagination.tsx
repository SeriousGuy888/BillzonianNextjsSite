import ArrowBackDouble from "@mui/icons-material/KeyboardDoubleArrowLeftRounded"
import ArrowBack from "@mui/icons-material/KeyboardArrowLeftRounded"
import ArrowForward from "@mui/icons-material/KeyboardArrowRightRounded"
import ArrowForwardDouble from "@mui/icons-material/KeyboardDoubleArrowRightRounded"
import { NextPage } from "next"
import styles from "./Pagination.module.scss"

interface PageProps {
  currPage: number
  maxPage: number
  goToPageFn: Function
}

const Pagination: NextPage<PageProps> = ({ currPage, maxPage, goToPageFn }) => {
  return (
    <div className={styles.pagination}>
      <div className={styles.arrowGroup}>
        <button onClick={() => goToPageFn(1)} disabled={currPage === 1}>
          <ArrowBackDouble />
        </button>
        <button
          onClick={() => goToPageFn(currPage - 1)}
          disabled={currPage === 1}
        >
          <ArrowBack />
        </button>
      </div>
      <p>
        Page {currPage} of {maxPage}
      </p>
      <div className={styles.arrowGroup}>
        <button
          onClick={() => goToPageFn(currPage + 1)}
          disabled={currPage === maxPage}
        >
          <ArrowForward />
        </button>
        <button
          onClick={() => goToPageFn(maxPage)}
          disabled={currPage === maxPage}
        >
          <ArrowForwardDouble />
        </button>
      </div>
    </div>
  )
}

export default Pagination
