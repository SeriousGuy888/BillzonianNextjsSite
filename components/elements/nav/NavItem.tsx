import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import type { ReactElement } from "react"

interface Props {
  children: ReactElement | ReactElement[]
  href: string
  label: string
}

const NavItem: NextPage<Props> = ({ children, href, label }) => {
  const currPath = useRouter().pathname

  let thisItemActive = false
  if (href === "/") { // For the homepage, require an exact match
    thisItemActive = href === currPath
  } else { // For other pages, subpages will make the link active
    thisItemActive = currPath.startsWith(href)
  }

  return (
    <div className={`navItem ${thisItemActive ? "active" : ""}`}>
      <Link href={href}>
        {children}
        <p>{label}</p>
      </Link>
    </div>
  )
}

export default NavItem
