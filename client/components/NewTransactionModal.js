import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import AccountPreview from './AccountPreview'

export default function NewTransaction({onSubmit, onCancel}) {
  const accounts = useSelector(state => state.accounts)
  const [type, setType] = useState('DEPOSIT')
  const [amount, setAmount] = useState('')
  const [account, setAccount] = useState(accounts[0].id)

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
