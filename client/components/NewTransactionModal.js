import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import AccountPreview from './AccountPreview'
import {Link, useRouteMatch} from 'react-router-dom'

export default function NewTransaction({onSubmit, onCancel}) {
  const accounts = useSelector(state => state.accounts)
  const [type, setType] = useState('DEPOSIT')
  const [amount, setAmount] = useState('')
  const [displayAmount, setDisplayAmount] = useState('')
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

  const updateAmount = value => {
    let newDisplayAmount = []
    const rawAmount = value
      .split('')
      .filter(el =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(el)
      )
    newDisplayAmount = [...rawAmount]
    if (newDisplayAmount.length > 0) newDisplayAmount.unshift('$')
    if (newDisplayAmount.length > 3) newDisplayAmount.splice(-2, 0, '.')

    setAmount(rawAmount.join(''))
    setDisplayAmount(newDisplayAmount.join(''))
  }

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">Make a Transaction</span>
          <span className="alignRight">
            <button
              type="button"
              onClick={cancel}
              className="lightFont linkDark textButton"
            >
              Cancel
            </button>
          </span>
        </div>
      </div>
      <div id="cardHolder">
        {account && (
          <AccountPreview
            account={accounts.find(acc => acc.id === account)}
            linkable={false}
          />
        )}
        <div className="cardFull">
          <form onSubmit={submit} className="transactionForm">
            {!match && (
              <div>
                <div style={{width: '75px'}}>Account: </div>
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
              </div>
            )}
            <div>
              <div style={{width: '75px'}}>Type: </div>
              <select
                value={type}
                onChange={e => {
                  setType(e.target.value)
                }}
              >
                <option value="DEPOSIT">Deposit</option>
                <option value="WITHDRAWAL">Withdrawal</option>
              </select>
            </div>
            <div>
              <div style={{width: '75px'}}>Amount: </div>
              <input
                className="largerFont"
                type="text"
                placeholder="$0.00"
                value={displayAmount}
                onChange={e => {
                  updateAmount(e.target.value)
                }}
                required
              />
            </div>
            <div>
              <button className="greenButton" type="submit" name="submit">
                {type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
