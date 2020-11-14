import React from 'react'
import {useSelector} from 'react-redux'
import {useRouteMatch} from 'react-router-dom'
import LineChart from './LineChart'
import SummaryBar from './SummaryBar'

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
        <span className="regularFont alignRight textButton">
          <button
            type="button"
            onClick={console.log('back')}
            className="linkDark"
          >
            Back
          </button>
        </span>
      </div>
      <div className="subHeader">
        <SummaryBar accounts={account} />
      </div>
      <div>
        <LineChart account={account} />
      </div>
    </div>
  )
}
