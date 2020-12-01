import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import LineChart from './LineChart'
import LineChart2 from './LineChart2'
import SummaryBar from './SummaryBar'
import {removeAccount, createTransaction} from '../store/thunks'
import history from '../history'
import Transactions from './Transactions'
import NewTransactionModal from './NewTransactionModal'

export default function AccountOverview() {
  const [accountData, setAccountData] = useState(null)
  const [transactionModal, setTransactionModal] = useState(false)
  const dispatch = useDispatch()

  const onSubmitTransaction = transaction => {
    dispatch(createTransaction(transaction))
    setTransactionModal(false)
  }

  let match = useRouteMatch({
    path: '/accounts/:accountId/'
  })
  const account = useSelector(state =>
    state.accounts.find(acc => acc.id === match.params.accountId)
  )

  useEffect(
    () => {
      account && setAccountData(account.transactions)
    },
    [account]
  )

  const lastYear = () => {
    const newData = accountData.filter((val, i) => i < 365)
    setAccountData(newData)
  }

  const deleteAccount = () => {
    history.push('/accounts')
    dispatch(removeAccount(account.id))
  }

  if (!account) return <h1>Loading</h1>

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
          <span className="largeFont">{account.name}</span>
          <span className="lightFont alignRight">
            <button
              type="button"
              onClick={() => setTransactionModal(true)}
              className="linkDark textButton"
              to="/home"
            >
              Transaction
            </button>
            <span> | </span>
            <button
              type="button"
              onClick={null}
              className="linkDark textButton"
            >
              <Link to="/accounts" className="linkDark">
                Back
              </Link>
            </button>
          </span>
        </div>

        <div className="subHeader">
          <span className="regularFont">{`${account.type} ACCOUNT`}</span>
          <SummaryBar accounts={account} />
        </div>
      </div>

      <div>
        {accountData && (
          <div>
            <LineChart accountData={accountData} />
            <LineChart2 accountData={accountData} />
          </div>
        )}
        <button type="button" onClick={lastYear} className="linkDark">
          filter
        </button>
      </div>
      <div className="header">
        <span className="lightFont">Transactions</span>
      </div>
      {account.transactions ? (
        <Transactions transactions={account.transactions} />
      ) : null}
      <div className="header">
        <span className="lightFont">Settings</span>
      </div>
      <button
        type="button"
        onClick={deleteAccount}
        className="linkDark textButton"
      >
        Delete Account
      </button>
    </div>
  )
}
