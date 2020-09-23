import React from 'react'

export default function AccountOverview({account}) {
  return (
    <div className="accountOverviewContainer">
      <div>
        <p className="boldFont">{account.name}</p>
        <p className="regularFont">{account.type}</p>
      </div>
      <div>
        <p className="boldFont">{account.balance}</p>
      </div>
    </div>
  )
}
