import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AccountPreview from './AccountPreview'
import NewAccountModal from './NewAccountModal'
import NewTransactionModal from './NewTransactionModal'
import {createAccount, createTransaction} from '../store/thunks'

export default function Accounts() {
  const [accountModal, setAccountModal] = useState(false)
  const [transactionModal, setTransactionModal] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  if (accounts.length === 0) return <p>No Accounts</p>

  const onSubmitAccount = newAccount => {
    newAccount.userId = user.id
    dispatch(createAccount(newAccount))
    setAccountModal(false)
  }

  const onSubmitTransaction = transaction => {
    dispatch(createTransaction(transaction))
    setTransactionModal(false)
  }

  if (accountModal) {
    return (
      <NewAccountModal
        onSubmit={onSubmitAccount}
        onCancel={() => setAccountModal(false)}
      />
    )
  }

  if (transactionModal) {
    return (
      <NewTransactionModal
        onSubmit={onSubmitTransaction}
        onCancel={() => setTransactionModal(false)}
      />
    )
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
            onClick={() => setTransactionModal(true)}
            className="linkDark"
            to="/home"
          >
            Transaction
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
