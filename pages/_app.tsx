import "../styles/globals.scss"
import "../styles/layout.scss"

import type { AppProps } from "next/app"

import { Montserrat } from "@next/font/google"
import Header from "../components/Header"
import Nav from "../components/Nav"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>

      <section className="layout">
        <Header />
        <Nav />
        <div className="content-section">
          <Component {...pageProps} />
        </div>
      </section>
    </>
  )
}
