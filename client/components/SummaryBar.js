import React from 'react'

export default function SummaryBar({accounts}) {
  console.log(accounts)

  const gain =
    accounts.reduce((acc, curr) => {
      return acc + curr.earnings
    }, 0) * 0.01
  return (
    <div className="summaryBar">
      <div className="summaryCard">
        <div className="thinFont">Value </div>
        <div className="regularFont largeFont">
          ${accounts.reduce((acc, curr) => {
            return acc + curr.balance
          }, 0) * 0.01}
        </div>
      </div>

      <div className="summaryCard">
        <div className="thinFont">Gain </div>
        <div className="regularFont largeFont">
          {gain > 0 ? `+$${gain}` : `-$${gain}`}
        </div>
      </div>

      <div className="summaryCard">
        <div className="thinFont alignRight">Return </div>
        <div className="regularFont largeFont">
          ${accounts.reduce((acc, curr) => {
            return acc + curr.balance
          }, 0) * 0.01}
        </div>
      </div>
    </div>
  )
}
