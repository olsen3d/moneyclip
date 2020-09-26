import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import {logout} from '../store'
import AccountSmallPreview from './AccountSmallPreview'

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
      <Link className="boldFont link" to="/home">
        Home
      </Link>
      <Link className="boldFont link" to="/news">
        News Feed
      </Link>
      <Link className="boldFont link" to="/accounts">
        Accounts
      </Link>
      <ul>
        {accounts ? (
          accounts.map(account => (
            <AccountSmallPreview key={account.id} account={account} />
          ))
        ) : (
          <li>no accounts</li>
        )}
      </ul>
      <a className="boldFont link" href="#" onClick={() => dispatch(logout())}>
        Logout
      </a>
    </div>
  )
}
