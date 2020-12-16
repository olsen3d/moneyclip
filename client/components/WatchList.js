import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import StockChart from './StockChart'

export default function WatchList() {
  const watchList = useSelector(state => state.watches)

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">Watch List</span>
          <span className="alignRight">
            <button
              className="whiteButton lightFont"
              type="button"
              onClick={() => setAccountModal(true)}
            >
              + Add New
            </button>
            <span className="horSpacer" />
            <button
              type="button"
              onClick={() => console.log('load')}
              className="greenButton"
            >
              Refresh
            </button>
          </span>
        </div>
        <div className="subHeader">
          <span className="regularFont">Stocks you are watching</span>
        </div>
      </div>
      <div id="cardHolder">
        {watchList &&
          watchList.map(stock => <StockChart key={stock.id} stock={stock} />)}
      </div>
    </div>
  )
}
