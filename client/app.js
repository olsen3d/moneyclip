import React from 'react'
import {useSelector} from 'react-redux'

import {Navbar, MobileNavbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  const user = useSelector(state => state.user)
  return (
    <div id="appContainer">
      <Navbar />
      <div className="main">
        {user.id && <MobileNavbar />}
        {user.id && <div id="sidebarPlaceholder" />}
        <div id="content">
          <Routes />
          {user.id && <Footer />}
        </div>
      </div>
    </div>
  )
}

export default App
