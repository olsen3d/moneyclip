import React from 'react'

export default function AccountOverview({account}) {
  return (
    <div className="accountOverviewContainer">
      <div className="accountLogo">
        <img width="15%" src="/img/investing.png" />
        <div className="accountName">
          <p className="regularFont">{account.name}</p>
          <p className="lightFont">{account.type}</p>
        </div>
      </div>
      <div className="accountBalance">
        <span className="lightFont">Balance: </span>
        <span className="regularFont">${account.balance * 0.01}</span>
      </div>
    </div>
  )
}
