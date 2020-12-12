import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

export default function WatchList() {
  const dispatch = useDispatch()
  //const watchList = useSelector(state => state.watchList)

  useEffect(() => {
    //watchList.length || dispatch(loadWatchList())
  }, [])

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
      <div id="cardHolder" />
    </div>
  )
}
