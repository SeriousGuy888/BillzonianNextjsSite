import WordLink from "../../components/elements/wordlist/WordLink"
import styles from "../../styles/Wordlist.module.scss"
import { motion } from "framer-motion"
import Head from "next/head"
import { useRouter } from "next/router"
import { getParamAsInt } from "../../utils/queryParamParser"
import { GetServerSideProps, NextPage } from "next"
import { getPageCount, getWordsOnPage } from "../../utils/dictionaryData"
import Pagination from "../../components/elements/wordlist/Pagination"
import { useCallback } from "react"

interface PageProps {
  words: string[]
  page: number
  maxPage: number
}

const WordPage: NextPage<PageProps> = ({ words, page, maxPage }) => {
  const router = useRouter()
  const goToPage = useCallback(
    (page: number) => {
      if (page <= 0 || page > maxPage) {
        return
      }

      router.push({
        pathname: router.pathname,
        query: { page },
      })
    },
    [router, maxPage],
  )

  return (
    <>
      <Head>
        <title>Billzonian Dictionary</title>
      </Head>
      <Pagination currPage={page} maxPage={maxPage} goToPageFn={goToPage} />
      <motion.section
        className={styles.wordList}
        initial={{ y: 25 }}
        animate={{ y: 0 }}
      >
        {words.map((w) => (
          <WordLink key={w} word={w} />
        ))}
      </motion.section>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({
  query,
}) => {
  const wordsPerPage = 16

  const pageNum = getParamAsInt(query.page, 1)
  const words = getWordsOnPage(pageNum, wordsPerPage)
  const maxPage = getPageCount(wordsPerPage)

  return {
    props: {
      words,
      page: pageNum,
      maxPage,
    },
  }
}

export default WordPage
