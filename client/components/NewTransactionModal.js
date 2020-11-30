import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import AccountPreview from './AccountPreview'
import {useRouteMatch} from 'react-router-dom'

export default function NewTransaction({onSubmit, onCancel}) {
  const accounts = useSelector(state => state.accounts)
  const [type, setType] = useState('DEPOSIT')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState(accounts[0].id)

  let match = useRouteMatch({
    path: '/accounts/:accountId/'
  })
  const selectedAccount = match
    ? useSelector(state =>
        state.accounts.find(acc => acc.id === match.params.accountId)
      )
    : null

  useEffect(
    () => {
      if (match) {
        setAccount(selectedAccount.id)
      }
    },
    [match]
  )

  const submit = e => {
    e.preventDefault()
    onSubmit({type, amount, accountId: account})
  }

  const cancel = e => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div id="profile">
      <div className="header">
        <span className="lightFont">Make a Transaction</span>
        <span className="regularFont alignRight textButton">
          <button type="button" onClick={cancel} className="linkDark">
            Back
          </button>
        </span>
      </div>
      <div>
        <ul className="listWidth">
          {account && (
            <AccountPreview
              account={accounts.find(acc => acc.id === account)}
            />
          )}
        </ul>
        <form onSubmit={submit}>
          {!match ? (
            <select
              value={account}
              onChange={e => {
                setAccount(e.target.value)
              }}
            >
              {accounts &&
                accounts.map(acc => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}
                  </option>
                ))}
            </select>
          ) : null}

          <select
            value={type}
            onChange={e => {
              setType(e.target.value)
            }}
          >
            <option value="DEPOSIT">Deposit</option>
            <option value="WITHDRAWAL">Withdrawal</option>
          </select>

          <input
            type="text"
            placeholder="amount"
            value={amount}
            onChange={e => {
              setAmount(e.target.value)
            }}
            required
          />
          <button type="submit" name="submit">
            {type}
          </button>
        </form>
      </div>
    </div>
  )
}
