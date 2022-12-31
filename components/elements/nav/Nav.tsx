import NavItem from "./NavItem"

import HomeIcon from "@mui/icons-material/HomeRounded"
import BookIcon from "@mui/icons-material/MenuBookRounded"
import ArticleIcon from "@mui/icons-material/ArticleRounded"
import GridIcon from "@mui/icons-material/GridViewRounded"
import SearchIcon from "@mui/icons-material/SearchRounded"

import { LogoCircle } from "../../logos"

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
        <NavItem href="/" label="Home" icon={<HomeIcon />} />
        <NavItem href="/words" label="Words" icon={<BookIcon />} />
        <NavItem href="/posts" label="Posts" icon={<ArticleIcon />} />
        <NavItem href="/wordle" label="Unkrat Wordle" icon={<GridIcon />} />
        <NavItem href="/search" label="Search" icon={<SearchIcon />} />
      </section>
    </nav>
  )
}
