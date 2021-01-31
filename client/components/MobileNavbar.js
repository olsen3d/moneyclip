import React, {useState} from 'react'
import MobileNavMenu from './MobileNavMenu'

export default function MobileNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <React.Fragment>
      <div className="mobileNav">
        <MobileNavMenu menuOpen={menuOpen} closeMenu={closeMenu} />
        <span className="menuText" onClick={toggleMenu}>
          {`${menuOpen ? 'close' : 'menu'}`}
        </span>
        <img
          className="mobileLogo"
          onClick={toggleMenu}
          height="36px"
          src="/img/moneyclipLogo.png"
        />
      </div>
      <div className="mobileNavSpacer" />
    </React.Fragment>
  )
}
