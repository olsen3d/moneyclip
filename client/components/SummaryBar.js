import React from 'react'

export default function SummaryBar({accounts}) {
  const value = accounts.length
    ? accounts.reduce((acc, curr) => {
        return acc + curr.balance
      }, 0) * 0.01
    : accounts.balance * 0.01

  const net = accounts.length
    ? accounts.reduce((acc, curr) => {
        return acc + curr.net
      }, 0) * 0.01
    : accounts.net * 0.01

  const gain = accounts.length
    ? accounts.reduce((acc, curr) => {
        return acc + curr.earnings
      }, 0) * 0.01
    : accounts.earnings * 0.01

  const roi = (gain / net * 100).toFixed(2)

  return (
    <div className="summaryBar">
      <div className="summaryCard">
        <div className="thinFont">value </div>
        <div className="regularFont largeFont">${value}</div>
      </div>

      <div className="summaryCard">
        <div className="thinFont">Gain </div>
        <div
          className={`regularFont largeFont ${
            gain > 0 ? 'positive' : 'negative'
          }`}
        >
          {gain > 0 ? `+$${gain}` : `-$${gain}`}
        </div>
      </div>

      <div className="summaryCard">
        <div className="thinFont alignRight">Return </div>
        <div
          className={`regularFont largeFont ${
            roi > 0 ? 'positive' : 'negative'
          }`}
        >
          {roi > 0 ? `+%${roi}` : `-%${roi}`}
        </div>
      </div>
    </div>
  )
}
