import React from 'react'

export default function AccountOverview({account}) {
  return (
    <div>
      <p className="boldFont">{account.name}</p>
      <p className="regularFont">{account.type}</p>
      <p className="regularFont">{account.balance}</p>
    </div>
  )
}
