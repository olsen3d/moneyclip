import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AccountPreview from './AccountPreview'

export default function Accounts() {
  const accounts = useSelector(state => state.accounts)
  if (accounts.length === 0) return <p>No Accounts</p>
  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">All Accounts ({accounts.length})</span>
        <span className="regularFont alignRight">Add New</span>
      </div>
      <ul>
        {accounts.map(account => (
          <AccountPreview key={account.id} account={account} />
        ))}
      </ul>
    </div>
  )
}
