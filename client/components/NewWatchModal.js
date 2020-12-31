import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import * as d3 from 'd3'
import {removeWatch} from '../store/thunks'

export default function NewWatch({onSubmit, onCancel, watchList}) {
  const [name, setName] = useState('')
  const [stockList, setStockList] = useState('')
  const [display, setDisplay] = useState('')
  const [isValid, setIsValid] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    d3.csv('/api/watches/stocks/list').then(data => setStockList(data))

    if (watchList.length >= 3)
      setDisplay('max of 3 symbols please delete one below')
  }, [])

  const updateName = e => {
    setName(e.target.value.toUpperCase())
    const match = stockList.find(
      stock => stock.symbol === e.target.value.toUpperCase()
    )

    if (watchList.length >= 3) {
      setDisplay('max of 3 symbols please delete one below')
      setIsValid(false)
    } else if (match) {
      setDisplay(match.securityName)
      setIsValid(true)
    } else {
      setDisplay('invalid symbol please try again')
      setIsValid(false)
    }
  }

  const submit = e => {
    e.preventDefault()
    if (isValid) onSubmit({name})
  }

  const cancel = e => {
    e.preventDefault()
    onCancel()
  }

  const removeWatchFn = id => {
    dispatch(removeWatch(id))
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
            <span className="regularFont font16 header">New Stock</span>
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
        {watchList.length ? (
          <div className="cardFull">
            <div>
              <span className="regularFont font16 header">WatchList</span>
            </div>
            <div className="spacer" />
            <span className="lightFont">Click to delete:</span>
            <div className="spacer" />
            <ul className="flexColumnLeft">
              {watchList.map(stock => (
                <button
                  key={stock.id}
                  type="button"
                  onClick={() => removeWatchFn(stock.id)}
                  className="regularFont linkDark textButton"
                >
                  {stock.name}
                </button>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
