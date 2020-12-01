import React from 'react'
import {formatter} from '../../script/utils'

export default function TransactionPreview({transaction}) {
  const {amount, balance, date, earnings, net, type} = transaction

  return (
    <div className="transactionOverviewContainer">
      <div className="accountLogo">
        <img
          width="40px"
          height="40px"
          src={`/img/${amount > 0 ? 'marketUp' : 'marketDown'}.png`}
        />
        <div className="accountName">
          <p className="regularFont font16">{type}</p>
          <p className="lightFont">
            {new Date(date).toLocaleDateString('en-us')}
          </p>
        </div>
      </div>
      <div className="accountEarnings">
        <span className="regularFont font16">
          {formatter.format(amount * 0.01)}
        </span>
        <span className="lightFont">Amount</span>
      </div>
      <div className="accountBalance">
        <span className="regularFont font16">
          {formatter.format(balance * 0.01)}
        </span>
        <span className="lightFont">Balance</span>
      </div>
    </div>
  )
}
