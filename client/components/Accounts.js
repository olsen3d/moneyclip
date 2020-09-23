import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AccountOverview from './AccountOverview'

export default function Accounts() {
  const accounts = useSelector(state => state.accounts)
  if (accounts.length === 0) return <p>No Accounts</p>
  return (
    <div id="profile">
      <p className="boldFont">All Accounts ({accounts.length})</p>
      <ul>
        {accounts.map(account => (
          <AccountOverview key={account.id} account={account} />
        ))}
      </ul>
    </div>
  )
}
