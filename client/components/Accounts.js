import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import AccountPreview from './AccountPreview'
import NewAccountModal from './NewAccountModal'
import NewTransactionModal from './NewTransactionModal'
import SummaryBar from './SummaryBar'
import {createAccount, createTransaction} from '../store/thunks'

export default function Accounts() {
  const [accountModal, setAccountModal] = useState(false)
  const [transactionModal, setTransactionModal] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)

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
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">
            All Accounts ({accounts.length})
          </span>
          <span className="alignRight">
            <button
              className="whiteButton lightFont"
              type="button"
              onClick={() => setAccountModal(true)}
            >
              + Add New
            </button>
            <span className="horSpacer" />
            <button
              className="greenButton lightFont"
              type="button"
              onClick={() => setTransactionModal(true)}
              to="/home"
            >
              Transaction
            </button>
          </span>
        </div>
        <div className="subHeader">
          <span className="regularFont">Overview of your accounts</span>
          <SummaryBar accounts={accounts} />
        </div>
      </div>
      <div id="cardHolder">
        {accounts.map(account => (
          <AccountPreview key={account.id} account={account} linkable={true} />
        ))}
      </div>
    </div>
  )
}
