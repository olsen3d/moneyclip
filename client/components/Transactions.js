import React, {useState, useEffect} from 'react'
import TransactionPreview from './TransactionPreview'

export default function Transactions({transactions}) {
  const [transPage, setTransPage] = useState(1)
  const [includeMarket, setIncludeMarket] = useState(false)
  const pageNums = []
  const perPage = 5
  for (
    let i = 0;
    i <=
    Math.floor(
      (includeMarket
        ? transactions.length
        : transactions.filter(trans => trans.type !== 'MARKET').length) /
        perPage
    );
    i++
  ) {
    pageNums.push(i + 1)
  }
  const indOfLast = transPage * perPage
  const indOfFirst = indOfLast - perPage
  const [currentTrans, setCurrentTrans] = useState(
    (includeMarket
      ? transactions
      : transactions.filter(trans => trans.type !== 'MARKET')
    ).slice(indOfFirst, indOfLast)
  )

  useEffect(
    () => {
      setTransPage(1)
      setCurrentTrans(
        (includeMarket
          ? transactions
          : transactions.filter(trans => trans.type !== 'MARKET')
        ).slice(0, 5)
      )
    },
    [transactions, includeMarket]
  )

  useEffect(
    () => {
      setCurrentTrans(
        (includeMarket
          ? transactions
          : transactions.filter(trans => trans.type !== 'MARKET')
        ).slice(indOfFirst, indOfLast)
      )
    },
    [transPage]
  )

  return (
    <div className="cardDouble">
      <div className="cardOneThirds">
        <div>
          <span className="regularFont font16 header">Transactions</span>
        </div>
        <div className="spacer" />
        <span className="lightFont">{`${new Date(
          currentTrans[0].date
        ).toLocaleDateString('en-us')} - ${new Date(
          currentTrans[currentTrans.length - 1].date
        ).toLocaleDateString('en-us')}`}</span>
        <div className="spacer" />
        Include market adj:
        <input
          type="checkbox"
          onChange={() => setIncludeMarket(!includeMarket)}
          value={includeMarket}
        />
        Page:
        <select
          onChange={e => {
            setTransPage(e.target.value)
          }}
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
