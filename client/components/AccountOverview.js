import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useRouteMatch} from 'react-router-dom'
import LineChart from './LineChart'
import SummaryBar from './SummaryBar'
import {removeAccount} from '../store/thunks'
import history from '../history'

export default function AccountOverview() {
  const [accountData, setAccountData] = useState(null)
  let match = useRouteMatch({
    path: '/accounts/:accountId/'
  })
  const account = useSelector(state =>
    state.accounts.find(acc => acc.id === match.params.accountId)
  )
  const dispatch = useDispatch()

  useEffect(
    () => {
      account && setAccountData(account.transactions)
    },
    [account]
  )

  const lastYear = () => {
    const newData = accountData.filter((val, i) => i > 10)

    setAccountData(newData)
  }

  const deleteAccount = () => {
    history.push('/accounts')
    dispatch(removeAccount(account.id))
  }

  if (!account) return <h1>Loading</h1>
  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">{account.name}</span>
        <span className="regularFont alignRight">
          <button
            type="button"
            onClick={() => setTransactionModal(true)}
            className="linkDark textButton"
            to="/home"
          >
            Transaction
          </button>
          <span> | </span>
          <button type="button" onClick={null} className="linkDark textButton">
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
      <div>
        {accountData && <LineChart accountData={accountData} />}
        <button type="button" onClick={lastYear} className="linkDark">
          filter
        </button>
      </div>
      <div className="header">
        <span className="lightFont">Transactions</span>
      </div>
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
