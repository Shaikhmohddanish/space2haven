import Image from "next/image"
import Link from "next/link"
import { MenuBar, MobileNav } from ".."

const Navbar = () => {
  return (
    <nav className="navbar-style">
      <Link href="/" className="flex items-center gap-2">
        <Image
          loading='eager'
          src="/logo.svg"
          alt="Space2Heaven"
          width={50}
          height={50}
          className="max-sm:size-10"
        />
        <h1 className="text-2xl font-bold">Space2Heaven</h1>
      </Link>

      <div className="flex-between gap-5">
        <MenuBar />
        <MobileNav />
      </div>

    </nav>
  )
}
export default Navbar