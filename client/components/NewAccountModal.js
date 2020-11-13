import React, {useState} from 'react'
import StrategyChart from './StrategyChart'

const descriptions = {
  CHECKING: 'this is a checking account. You can deposit and withdrawl funds',
  SAVING:
    'this is a savings account. You can deposit and withdrawl funds. Your funds will accumulate interest at the current APY of 0.40%',
  INVESTING:
    'this is an investing account. You can deposit and withdrawl funds. Your funds will be invested according to one of the 3 different investment strategies below:'
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
    <div id="profile">
      <div className="header">
        <span className="lightFont">Add a new Account</span>
        <span className="regularFont alignRight textButton">
          <button type="button" onClick={cancel} className="linkDark">
            Back
          </button>
        </span>
      </div>
      <div className="subHeader">
        <form onSubmit={submit}>
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

          <input
            type="text"
            placeholder="account name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <button type="submit" name="submit">
            Create
          </button>
        </form>
        <div>{desc}</div>
        {type === 'INVESTING' ? (
          <div>
            <StrategyChart />
          </div>
        ) : null}
      </div>
    </div>
  )
}
