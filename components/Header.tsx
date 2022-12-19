import Image from "next/image"
import logo from "../public/logos/circle.svg"

export default function Header() {
  return (
    <header className="layoutHeader">

      <div className="logoBlock">
        <Image src={logo} alt="Billzonian Logo" width={0} height={0} />
        <h3>Billzonian</h3>
      </div>
      
      <div className="verticalLine"></div>

    </header>
  )
}
