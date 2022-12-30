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

  return reactStringReplace(gloss, quotedStrRegex, (match, i) => (
    <WordLink key={i} word={match} />
  ))
}

export default WordGloss
