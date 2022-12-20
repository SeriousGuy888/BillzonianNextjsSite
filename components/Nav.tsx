import Image from "next/image"
import logo from "../public/logos/circle.svg"

export default function Nav() {
  return (
    <nav>
      <div className="logoBlock">
        <Image src={logo} alt="Billzonian Logo" width={0} height={0} />
        <h3>Billzonian</h3>
      </div>
    </nav>
  )
}
