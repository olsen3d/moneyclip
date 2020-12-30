import React, {useEffect, useState} from 'react'
import * as d3 from 'd3'

export default function NewWatch({onSubmit, onCancel}) {
  const [name, setName] = useState('')
  const [stockList, setStockList] = useState('')
  const [display, setDisplay] = useState('invalid symbol please try again')
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    d3.csv('/api/watches/stocks/list').then(data => setStockList(data))
  }, [])

  const updateName = e => {
    setName(e.target.value.toUpperCase())
    const match = stockList.find(
      stock => stock.symbol === e.target.value.toUpperCase()
    )
    if (match) {
      setDisplay(match.securityName)
      setIsValid(true)
    } else {
      setDisplay('invalid symbol please try again')
      setIsValid(false)
    }
  }

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
          <form onSubmit={submit} className="transactionForm">
            <div className="spacer" />
            <div>
              <div style={{width: '75px'}}>Symbol: </div>
              <input
                type="text"
                placeholder="symbol"
                value={name}
                onChange={e => updateName(e)}
                required
              />
              <span
                className={`regularFont ${isValid ? 'positive' : 'negative'}`}
              >
                {'  '}
                {display}
              </span>
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
