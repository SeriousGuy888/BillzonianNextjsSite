import styles from "../styles/Home.module.scss"
import { LogoNoFill } from "../components/logos"

export default function Home() {
  return (
    <section className={styles.hero}>
      <div className={styles.centerpiece}>
        <LogoNoFill width="20vh" height="20vh" />
        <h2>Billzonian</h2>
        <p>A pretty cool fork of English</p>
      </div>
    </section>
  )
}
