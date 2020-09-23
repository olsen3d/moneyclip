import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function Home() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const dispatch = useDispatch()
  return (
    <div id="profile">
      <p className="boldFont">Welcome back, {user.email}</p>
      <span className="regularFont">Net Worth: </span>
      <span className="boldFont">
        ${accounts.reduce((acc, curr) => {
          return acc + curr.balance
        }, 0) * 0.01}
      </span>
    </div>
  )
}
