import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import StockChart from './StockChart'
import {loadWatches} from '../store/thunks'
import NewWatchModal from './NewWatchModal'

export default function WatchList() {
  const [watchModal, setWatchModal] = useState(false)
  const watchList = useSelector(state => state.watches)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const onSubmitAccount = newWatch => {
    console.log(newWatch)
    //newAccount.userId = user.id
    //dispatch(createAccount(newAccount))
    setWatchModal(false)
  }

  if (watchModal) {
    return (
      <NewWatchModal
        onSubmit={onSubmitAccount}
        onCancel={() => setWatchModal(false)}
      />
    )
  }

  return (
    <div id="mainContent">
      <div id="topBar">
        <div className="header">
          <span className="largerFont regularFont">Watch List</span>
          <span className="alignRight">
            <button
              className="whiteButton lightFont"
              type="button"
              onClick={() => setWatchModal(true)}
            >
              + Add New
            </button>
            <span className="horSpacer" />
            <button
              type="button"
              onClick={() => dispatch(loadWatches(user.id))}
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
