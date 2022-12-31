import WordListLink from "../../components/elements/wordlist/WordListLink"
import styles from "../../styles/Wordlist.module.scss"
import Head from "next/head"
import { useRouter } from "next/router"
import { getParamAsInt } from "../../utils/queryParamParser"
import { NextPage } from "next"
import { getPageCount } from "../../utils/dictionaryData"
import Pagination from "../../components/elements/wordlist/Pagination"
import { useCallback, useEffect, useState } from "react"
import useSWR from "swr"
import LoadingSpinner from "../../components/elements/LoadingSpinner"

interface PageProps {
  initialPage: number
  pageCount: number
}

const WordListSection: NextPage<{ page: number }> = ({ page }) => {
  const { data: words } = useSWR(`/api/words?page=${page}`) as {
    data: string[]
  }

  return (
    <section className={styles.wordList}>
      {words ? (
        words.map((w) => <WordListLink key={w} word={w} />)
      ) : (
        <LoadingSpinner />
      )}
    </section>
  )
}

const WordPage: NextPage<PageProps> = ({ initialPage, pageCount }) => {
  const router = useRouter()
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    setPage(initialPage)
  }, [initialPage])

  const goToPage = useCallback(
    (newPage: number) => {
      if (newPage <= 0 || newPage > pageCount) {
        return
      }
      setPage(newPage)

      router.push(
        {
          pathname: router.pathname,
          query: { page: newPage },
        },
        undefined,
        { shallow: true },
      )
    },
    [router, pageCount],
  )

  return (
    <>
      <Head>
        <title>Billzonian Dictionary</title>
      </Head>
      <Pagination currPage={page} maxPage={pageCount} goToPageFn={goToPage} />
      <WordListSection page={page} />

      {/* Preloads the previous and next pages so the transition when the
      user clicks next page or previous page is faster/smoother. */}
      <div style={{ display: "none" }}>
        <WordListSection page={page + 1} />
        <WordListSection page={page - 1} />
      </div>
    </>
  )
}

WordPage.getInitialProps = async ({ query }) => {
  const initialPage = getParamAsInt(query.page, 1)
  const pageCount = getPageCount(16)

  return {
    initialPage,
    pageCount,
  }
}

export default WordPage
