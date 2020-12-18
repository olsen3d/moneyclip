import React, {useState} from 'react'
import StrategyChart from './StrategyChart'

export default function NewWatch({onSubmit, onCancel}) {
  const [name, setName] = useState('')

  const submit = e => {
    e.preventDefault()
    onSubmit({name})
  }

  const cancel = e => {
    e.preventDefault()
    onCancel()
  }

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">
            Add a new stock to watch
          </span>
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
        <div className="cardFull">
          <div>
            <span className="regularFont font16 header">Stock</span>
          </div>
          <div className="spacer" />
          <form onSubmit={submit} className="watchForm">
            <div className="spacer" />
            <div>
              <div style={{width: '75px'}}>Symbol: </div>
              <input
                type="text"
                placeholder="symbol"
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
      </div>
    </div>
  )
}
