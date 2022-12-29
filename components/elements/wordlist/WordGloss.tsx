import { NextPage } from "next"
import Link from "next/link"
import React, { ReactNode } from "react"
import reactStringReplace from "react-string-replace"

interface PageProps {
  glossStr: string
}

const WordGloss: NextPage<PageProps> = ({ glossStr }) => {
  return <li key={glossStr}>{parseWordLinks(glossStr)}</li>
}

const parseWordLinks = (gloss: string): Iterable<ReactNode> => {
  return reactStringReplace(gloss, /`(.+)`/g, (match, i) => (
    <Link key={i} href={match}>
      {match}
    </Link>
  ))
}

export default WordGloss
