import React, {useState} from 'react'
import StrategyChart from './StrategyChart'

const descriptions = {
  CHECKING: 'This is a checking account. You can deposit and withdrawl funds',
  SAVING:
    'This is a savings account. You can deposit and withdrawl funds. Your funds will accumulate interest at the current APY of 0.40%',
  INVESTING:
    'This is an investing account. You can deposit and withdrawl funds. Your funds will be invested according to one of the 3 different investment strategies below:'
}

export default function NewAccount({onSubmit, onCancel}) {
  const [type, setType] = useState('CHECKING')
  const [name, setName] = useState('')
  const [desc, setDesc] = useState(descriptions.CHECKING)

  const submit = e => {
    e.preventDefault()
    onSubmit({name, type})
  }

  const cancel = e => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">Add a new Account</span>
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
        <div className="cardDouble">
          <div className="cardHalf">
            <form onSubmit={submit} className="transactionForm">
              <div>
                <span className="regularFont font16 header">Account</span>
              </div>
              <div className="spacer" />
              <div>
                <div style={{width: '75px'}}>Type: </div>
                <select
                  value={type}
                  onChange={e => {
                    setType(e.target.value)
                    setDesc(descriptions[e.target.value])
                  }}
                >
                  <option value="CHECKING">Checking</option>
                  <option value="SAVING">Saving</option>
                  <option value="INVESTING">Investing</option>
                </select>
              </div>
              <div>
                <div style={{width: '75px'}}>Name: </div>
                <input
                  type="text"
                  placeholder="account name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <div style={{width: '75px'}} />
                <button className="greenButton" type="submit" name="submit">
                  Create
                </button>
              </div>
            </form>
          </div>
          <div className="cardHalf">
            <div>
              <span className="regularFont font16 header">Description</span>
            </div>
            <div className="spacer" />
            <div>{desc}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
