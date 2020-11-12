import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ChartTest from './ChartTest'

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
      <span className="regularFont">Net Worth: </span>
      <span className="boldFont">
        ${accounts.reduce((acc, curr) => {
          return acc + curr.balance
        }, 0) * 0.01}
      </span>
      <ChartTest />
    </div>
  )
}
