import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import ChartTest from './ChartTest'
import SummaryBar from './SummaryBar'
import NewTransactionModal from './NewTransactionModal'
import {createTransaction} from '../store/thunks'

export default function Home() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.accounts)
  const [transactionModal, setTransactionModal] = useState(false)
  const dispatch = useDispatch()

  const onSubmitTransaction = transaction => {
    dispatch(createTransaction(transaction))
    setTransactionModal(false)
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
          <span className="largerFont regularFont">Home ({user.email})</span>
          <span className="alignRight">
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
