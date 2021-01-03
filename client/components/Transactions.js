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
        : transactions.filter(
            trans =>
              trans.type === 'DEPOSIT' ||
              trans.type === 'SEED_DEPOSIT' ||
              trans.type === 'WITHDRAWAL'
          ).length) / perPage
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
      : transactions.filter(
          trans =>
            trans.type === 'DEPOSIT' ||
            trans.type === 'SEED_DEPOSIT' ||
            trans.type === 'WITHDRAWAL'
        )
    ).slice(indOfFirst, indOfLast)
  )

  useEffect(
    () => {
      setTransPage(1)
      setCurrentTrans(
        (includeMarket
          ? transactions
          : transactions.filter(
              trans =>
                trans.type === 'DEPOSIT' ||
                trans.type === 'SEED_DEPOSIT' ||
                trans.type === 'WITHDRAWAL'
            )
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
          : transactions.filter(
              trans =>
                trans.type === 'DEPOSIT' ||
                trans.type === 'SEED_DEPOSIT' ||
                trans.type === 'WITHDRAWAL'
            )
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
          currentTrans[currentTrans.length - 1].date
        ).toLocaleDateString('en-us')} - ${new Date(
          currentTrans[0].date
        ).toLocaleDateString('en-us')}`}</span>
        <div className="spacer" />
        <div>
          <span className="regularFont">Include market adj: </span>
          <span className="lightFont">
            <input
              type="checkbox"
              onChange={() => setIncludeMarket(!includeMarket)}
              value={includeMarket}
            />
          </span>
        </div>
        <div>
          <span className="regularFont">Page: </span>
          <span className="lightFont">
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
          </span>
        </div>
        <div className="spacerBig" />
        <div>
          <span className="regularFont">Deposits: </span>
          <span className="lightFont">
            {`${
              transactions.filter(
                trans =>
                  trans.type === 'SEED_DEPOSIT' || trans.type === 'DEPOSIT'
              ).length
            }`}
          </span>
        </div>
        <div>
          <span className="regularFont">Withdrawals: </span>
          <span className="lightFont">
            {`${
              transactions.filter(trans => trans.type === 'WITHDRAWAL').length
            }`}
          </span>
        </div>
      </div>

      <div className="cardTwoThirdsBlank">
        {currentTrans.map(transaction => (
          <TransactionPreview key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}
