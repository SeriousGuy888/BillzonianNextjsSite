import "../styles/globals.scss"
import "../styles/layout.scss"

import type { AppProps } from "next/app"

import { Montserrat } from "@next/font/google"
import Nav from "../components/elements/nav/Nav"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--montserrat",
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${montserrat.variable} layout`}>
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
