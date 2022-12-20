import Link from "next/link"
import NavItem from "./NavItem"
import { BookIcon, HomeIcon } from "./svgs/icons"
import { LogoCircle } from "./svgs/logos"

export default function Nav() {
  return (
    <nav>
      <section className="logoBlock">
        <LogoCircle />
        <h3>Billzonian</h3>
      </section>

      <section className="linkList">
        <NavItem href="/" label="Home">
          <HomeIcon />
        </NavItem>
        <NavItem href="/words" label="Dictionary">
          <BookIcon />
        </NavItem>
      </section>
    </nav>
  )
}
