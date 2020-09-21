import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function Home() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const dispatch = useDispatch()
  return (
    <div id="profile">
      <h3 className="boldFont">Welcome back, {user.email}</h3>
      <ul>
        {accounts.map(account => <li key={account.id}>{account.name}</li>)}
      </ul>
    </div>
  )
}
