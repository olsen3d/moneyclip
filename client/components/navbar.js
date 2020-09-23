import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import {logout} from '../store'

export default function Navbar() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const dispatch = useDispatch()
  const match = useRouteMatch('/:component')
  const currentPage = match.params.component
  if (!user.id) return null
  return (
    <div id="sidebar">
      <div className="logoContainer">
        <img width="90%" src="/img/moneyclipLogo.png" />
      </div>
      <Link className="boldFont" to="/home">
        Home
      </Link>
      <Link className="boldFont" to="/news">
        News Feed
      </Link>
      <Link className="boldFont" to="/accounts">
        Accounts
      </Link>
      <ul>
        {accounts &&
          accounts.map(account => (
            <li className="lightFont" key={account.id}>
              {account.name}
            </li>
          ))}
      </ul>
      <a className="boldFont" href="#" onClick={() => dispatch(logout())}>
        Logout
      </a>
    </div>
  )
}
