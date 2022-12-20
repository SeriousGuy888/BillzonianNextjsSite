import Link from "next/link"
import NavItem from "./NavItem"
import { BookIcon, HomeIcon, InfoIcon, SearchIcon } from "../../svgs/icons"
import { LogoCircle } from "../../svgs/logos"

export default function Nav() {
  return (
    <nav>
      <section className="logoBlock">
        <LogoCircle />
        <div className="wordmark">
          <h3>Billzonian</h3>
          <p>Chambi owosom.</p>
        </div>
      </section>

      <section className="linkList">
        <NavItem href="/" label="Home">
          <HomeIcon />
        </NavItem>
        <NavItem href="/words" label="Dictionary">
          <BookIcon />
        </NavItem>
        <NavItem href="/info" label="Info">
          <InfoIcon />
        </NavItem>
        <NavItem href="/search" label="Search">
          <SearchIcon />
        </NavItem>
      </section>
    </nav>
  )
}
