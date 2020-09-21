import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

export default function Navbar() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const dispatch = useDispatch()
  return (
    <div id="sidebar">
      <div className="logoContainer">
        <img width="90%" src="/img/moneyclipLogo.png" />
      </div>
      <Link to="/home">Home</Link>
      <Link to="/news">News</Link>
      <Link to="/accounts">Accounts</Link>
      <ul>
        {accounts &&
          accounts.map(account => <li key={account.id}>{account.name}</li>)}
      </ul>
      <a href="#" onClick={() => dispatch(logout())}>
        Logout
      </a>
    </div>
  )
}
