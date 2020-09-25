import React from 'react'
import {useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'

export default function AccountOverview() {
  let match = useRouteMatch({
    path: '/accounts/:accountId/'
  })
  const account = useSelector(state =>
    state.accounts.find(acc => acc.id === match.params.accountId)
  )
  console.log(account)
  if (!account) return <h1>Loading</h1>
  return (
    <div id="profile">
      <h1>Account {account.id}</h1>
    </div>
  )
}
