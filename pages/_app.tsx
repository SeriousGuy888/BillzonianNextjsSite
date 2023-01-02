import "../styles/globals.scss"
import "../styles/layout.scss"

import type { AppProps } from "next/app"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"

import Nav from "../modules/nav/Nav"
import Router, { useRouter } from "next/router"
import { usePageLoading } from "../hooks/usePageLoading"
import LoadingSpinner from "../components/elements/LoadingSpinner"
import { SWRConfig } from "swr"
import Head from "next/head"

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const { isPageLoading } = usePageLoading()

  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.25 }}>
      <AnimatePresence mode="wait">
        <SWRConfig
          value={{
            fetcher: (url: string) => fetch(url).then((r) => r.json()),
            refreshInterval: 5 * 60_000,
            dedupingInterval: 60_000,
          }}
        >
          <Head>
            <title>Billzonian</title>
            <meta name="description" content="The Billzonian Language" />
            <meta name="theme-color" content="#b22ef9" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="layout">
            <Nav />
            <motion.main
              key={router.route}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {isPageLoading ? (
                <LoadingSpinner />
              ) : (
                <Component {...pageProps} />
              )}
            </motion.main>
          </div>
        </SWRConfig>
      </AnimatePresence>
    </MotionConfig>
  )
}

const routeChange = () => {
  // Temporary fix to avoid flash of unstyled content
  // during route transitions. Keep an eye on this
  // issue and remove this code when resolved:
  // https://github.com/vercel/next.js/issues/17464

  const tempFix = () => {
    const allStyleElems = document.querySelectorAll('style[media="x"]')
    allStyleElems.forEach((elem) => {
      elem.removeAttribute("media")
    })
  }
  tempFix()
}

Router.events.on("routeChangeComplete", routeChange)
Router.events.on("routeChangeStart", routeChange)
