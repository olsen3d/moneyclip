import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import ChartTest from './ChartTest'
import SummaryBar from './SummaryBar'
import AccountDataDisplay from './accountDataDisplay'

export default function Home() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)

  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">Home ({user.email})</span>
        <span className="regularFont alignRight textButton">
          <button
            type="button"
            onClick={() => console.log('click')}
            className="linkDark"
            to="/home"
          >
            Transaction
          </button>
        </span>
      </div>
      <div className="subHeader">
        <span className="regularFont">Overview of your financials</span>
        <SummaryBar accounts={accounts} />
      </div>
      <ChartTest />
    </div>
  )
}
