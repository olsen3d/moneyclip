import React, {useState, useEffect} from 'react'
import TransactionPreview from './TransactionPreview'

export default function Transactions({transactions}) {
  const [transPage, setTransPage] = useState(1)
  const pageNums = []
  const perPage = 5
  for (let i = 0; i <= Math.floor(transactions.length / perPage); i++) {
    pageNums.push(i + 1)
  }
  const indOfLast = transPage * perPage
  const indOfFirst = indOfLast - perPage

  let currentTrans = transactions.slice(indOfFirst, indOfLast)

  useEffect(
    () => {
      setTransPage(1)
      currentTrans = transactions.slice(indOfFirst, indOfLast)
    },
    [transactions]
  )

  return (
    <div className="cardDouble">
      <div className="cardOneThirds">
        <div>
          <span className="regularFont font16 header">Transactions</span>
        </div>
        <div className="spacer" />
        <span className="lightFont">filter here</span>
        <div className="spacer" />
        <select
          onChange={e => setTransPage(e.target.value)}
          name="page"
          value={transPage}
        >
          {pageNums.map(page => {
            return (
              <option key={page} value={page}>
                {page}
              </option>
            )
          })}
        </select>
      </div>

      <div className="cardTwoThirdsBlank">
        {currentTrans.map(transaction => (
          <TransactionPreview key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}
