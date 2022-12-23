import NavItem from "./NavItem"

import HomeIcon from "@mui/icons-material/HomeRounded"
import BookIcon from "@mui/icons-material/MenuBookRounded"
import ArticleIcon from "@mui/icons-material/ArticleRounded"
import SearchIcon from "@mui/icons-material/SearchRounded"

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
        <NavItem href="/posts" label="Posts">
          <ArticleIcon />
        </NavItem>
        <NavItem href="/search" label="Search">
          <SearchIcon />
        </NavItem>
      </section>
    </nav>
  )
}
