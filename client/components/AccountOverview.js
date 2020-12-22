import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import SummaryBar from './SummaryBar'
import {createTransaction} from '../store/thunks'
import Transactions from './Transactions'
import NewTransactionModal from './NewTransactionModal'
import InvestingChart from './InvestingChart'
import Settings from './Settings'

export default function AccountOverview() {
  const [transactionModal, setTransactionModal] = useState(false)
  let match = useRouteMatch({
    path: '/accounts/:accountId/'
  })
  const account = useSelector(state =>
    state.accounts.find(acc => acc.id === match.params.accountId)
  )
  const dispatch = useDispatch()

  const onSubmitTransaction = transaction => {
    dispatch(createTransaction(transaction))
    setTransactionModal(false)
  }

  if (!account) return <h1>No account data</h1>

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
          <span className="largerFont regularFont">{account.name}</span>
          <span className="alignBottom">
            <Link to="/accounts" className="lightFont linkDark">
              Back
            </Link>
            <span className="horSpacer" />
            <button
              className="greenButton"
              type="button"
              onClick={() => setTransactionModal(true)}
              to="/home"
            >
              Transaction
            </button>
          </span>
        </div>

        <div className="subHeader">
          <span className="regularFont">
            {`${account.type} ACCOUNT`}
            {account.type === 'INVESTING' ? ` (${account.strategy})` : null}
          </span>
          <SummaryBar accounts={account} />
        </div>
      </div>

      <div id="cardHolder">
        {account.transactions &&
          account.type !== 'CHECKING' && (
            <InvestingChart accountData={account.transactions} />
          )}

        {account.transactions && (
          <div className="cardDouble">
            <Transactions transactions={account.transactions} page={1} />
          </div>
        )}
        <Settings account={account} />
      </div>
    </div>
  )
}
