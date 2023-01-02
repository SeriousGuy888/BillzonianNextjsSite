import { NextPage } from "next"
import Link from "next/link"
import React, { ReactNode } from "react"
import reactStringReplace from "react-string-replace"
import WordLink from "./WordLink"

interface PageProps {
  text: string
}

const WordGloss: NextPage<PageProps> = ({ text }) => {
  return <>{parseWordLinks(text)}</>
}

const parseWordLinks = (gloss: string): Iterable<ReactNode> => {
  const quotedInBackticks = /`([^\\`]+)`/g
  const quotedInAsterisks = /\*([^\\\*]+)\*/g

  let replaced
  replaced = reactStringReplace(gloss, quotedInBackticks, (match, i) => (
    <WordLink key={i} word={match} />
  ))
  replaced = reactStringReplace(replaced, quotedInAsterisks, (match, i) => (
    <Link key={i} target="_blank" href={`https://en.wiktionary.org/wiki/${match}`}>
      {match}
    </Link>
  ))

  return replaced.map((e) => {
    if (e === " ") {
      return "\u00a0" // non breaking space (&nbsp;)
    } else {
      return e
    }
  })
}

export default WordGloss
