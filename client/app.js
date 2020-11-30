import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div id="appContainer">
      <Navbar />
      <div className="main">
        <div id="sidebarPlaceholder" />
        <Routes />
      </div>
    </div>
  )
}

export default App
