import "../styles/globals.scss"
import "../styles/layout.scss"

import type { AppProps } from "next/app"

import Nav from "../components/elements/nav/Nav"
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="layout">
      <Nav />
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  )
}
