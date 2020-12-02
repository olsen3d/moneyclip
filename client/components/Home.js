import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import ChartTest from './ChartTest'
import SummaryBar from './SummaryBar'

export default function Home() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">Home ({user.email})</span>
          <button
            className="greenButton lightFont"
            type="button"
            onClick={() => setTransactionModal(true)}
            to="/home"
          >
            Transaction
          </button>
        </div>
        <div className="subHeader">
          <span className="regularFont">Overview of your financials</span>
          <SummaryBar accounts={accounts} />
        </div>
      </div>

      <div id="cardHolder">
        <div className="cardDouble">
          <ChartTest />
        </div>
      </div>
    </div>
  )
}
