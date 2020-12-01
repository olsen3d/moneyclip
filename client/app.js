import React from 'react'
import {useSelector} from 'react-redux'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  const user = useSelector(state => state.user)
  return (
    <div id="appContainer">
      <Navbar />
      <div className="main">
        {user.id && <div id="sidebarPlaceholder" />}
        <div id="content">
          <Routes />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
