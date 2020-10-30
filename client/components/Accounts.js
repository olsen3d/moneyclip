import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import AccountPreview from './AccountPreview'
import NewAccountModal from './NewAccountModal'
import {createAccount} from '../store/thunks'

export default function Accounts() {
  const [accountModal, setAccountModal] = useState(false)
  const [depositModal, setDepositModal] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  if (accounts.length === 0) return <p>No Accounts</p>

  const onSubmit = newAccount => {
    newAccount.userId = user.id
    console.log(newAccount)
    dispatch(createAccount(newAccount))
    setAccountModal(false)
  }

  if (accountModal) {
    return (
      <NewAccountModal
        onSubmit={onSubmit}
        onCancel={() => setAccountModal(false)}
      />
    )
  }

  if (depositModal) {
    //return <NewAccount onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">All Accounts ({accounts.length})</span>
        <span className="regularFont alignRight textButton">
          <button
            type="button"
            onClick={() => setAccountModal(true)}
            className="linkDark"
          >
            Add New
          </button>
          <span> | </span>
          <button
            type="button"
            onClick={() => setAccountModal(true)}
            className="linkDark"
            to="/home"
          >
            Deposit
          </button>
        </span>
      </div>
      <ul className="listWidth">
        {accounts.map(account => (
          <AccountPreview key={account.id} account={account} />
        ))}
      </ul>
    </div>
  )
}
