import { NextPage } from "next"
import Link from "next/link"
import React, { ReactNode } from "react"
import reactStringReplace from "react-string-replace"

interface PageProps {
  text: string
}

const WordGloss: NextPage<PageProps> = ({ text }) => {
  return <li>{parseWordLinks(text)}</li>
}

const parseWordLinks = (gloss: string): Iterable<ReactNode> => {
  const quotedStrRegex = /`([^\\`]+)`/g

  return reactStringReplace(gloss, quotedStrRegex, (match, i) => (
    <Link key={i} href={match}>
      {match}
    </Link>
  ))
}

export default WordGloss
