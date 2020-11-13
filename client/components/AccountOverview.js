import React from 'react'
import {useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'
import LineChart from './LineChart'

export default function AccountOverview() {
  let match = useRouteMatch({
    path: '/accounts/:accountId/'
  })
  const account = useSelector(state =>
    state.accounts.find(acc => acc.id === match.params.accountId)
  )
  if (!account) return <h1>Loading</h1>
  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">{account.name}</span>
      </div>
      <div className="subHeader">
        <span className="regularFont">{account.type} Account</span>
      </div>
      <div>
        <LineChart account={account} />
      </div>
    </div>
  )
}
