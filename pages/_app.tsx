import "../styles/globals.scss"
import "../styles/layout.scss"

import type { AppProps } from "next/app"

import { Montserrat } from "@next/font/google"
import Header from "../components/Header"
import Nav from "../components/Nav"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--montserrat",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${montserrat.variable} layout`}>
      <Header />
      <Nav />
      <div className="contentSection">
        <Component {...pageProps} />
      </div>
    </main>
  )
}
