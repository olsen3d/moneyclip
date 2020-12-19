/* eslint-disable complexity */
import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import {logout} from '../store'
import AccountSmallPreview from './AccountSmallPreview'
import WatchSmallPreview from './WatchSmallPreview'

export default function Navbar() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const watchlist = useSelector(state => state.watches)
  const dispatch = useDispatch()
  const match = useRouteMatch('/:component')
  const currentPage = match ? match.params.component : null

  if (!user.id) return null

  return (
    <div id="sidebar">
      <div className="logoContainer">
        <img width="90%" src="/img/moneyclipLogo.png" />
      </div>
      <Link
        className={`boldFont link ${
          currentPage === 'home' ? 'navSelected' : 'navNotSelected'
        }`}
        to="/home"
      >
        Home
      </Link>
      <Link
        className={`boldFont link ${
          currentPage === 'news' ? 'navSelected' : 'navNotSelected'
        }`}
        to="/news"
      >
        News Feed
      </Link>
      <Link
        className={`boldFont link ${
          currentPage === 'watchList' ? 'navSelected' : 'navNotSelected'
        }`}
        to="/watchList"
      >
        Watch List
      </Link>
      <ul className="listBar">
        {watchlist &&
          watchlist.map(stock => (
            <WatchSmallPreview key={stock.name} stock={stock} />
          ))}
      </ul>
      <Link
        className={`boldFont link ${
          currentPage === 'accounts' ? 'navSelected' : 'navNotSelected'
        }`}
        to="/accounts"
      >
        Accounts
      </Link>
      <ul className="listBar">
        {accounts ? (
          accounts.map(account => (
            <AccountSmallPreview key={account.id} account={account} />
          ))
        ) : (
          <li>no accounts</li>
        )}
      </ul>
      <a
        className="boldFont link navNotSelected"
        href="#"
        onClick={() => dispatch(logout())}
      >
        Logout
      </a>
    </div>
  )
}
