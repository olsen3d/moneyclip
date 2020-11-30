import React, {useState} from 'react'
import TransactionPreview from './TransactionPreview'

export default function Transactions({transactions}) {
  const [transPage, setTransPage] = useState(1)
  const pageNums = []
  const perPage = 6
  for (let i = 0; i <= Math.floor(transactions.length / perPage); i++) {
    pageNums.push(i + 1)
  }
  const indOfLast = transPage * perPage
  const indOfFirst = indOfLast - perPage

  const currentTrans = transactions.slice(indOfFirst, indOfLast)

  return (
    <div>
      <select onChange={e => setTransPage(e.target.value)} name="page">
        {pageNums.map(page => {
          return (
            <option key={page} value={page}>
              {page}
            </option>
          )
        })}
      </select>
      <ul className="">
        {currentTrans.map(transaction => (
          <TransactionPreview key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </div>
  )
}
