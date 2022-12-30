import { NextPage } from "next"
import React, { ReactNode } from "react"
import reactStringReplace from "react-string-replace"
import WordLink from "./WordLink"

interface PageProps {
  text: string
}

const WordGloss: NextPage<PageProps> = ({ text }) => {
  return <li>{parseWordLinks(text)}</li>
}

const parseWordLinks = (gloss: string): Iterable<ReactNode> => {
  const quotedStrRegex = /`([^\\`]+)`/g

  const replaced = reactStringReplace(gloss, quotedStrRegex, (match, i) => (
    <WordLink key={i} word={match} />
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
