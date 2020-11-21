import React from 'react'

export default function AccountDataDisplay({data}) {
  let accountData = data
  if (data.length) {
    accountData = data[0]
    // accountData = data.reduce((acc, val) => {
    //   acc.balance += val.balance
    //   return acc
    // }, {balance: 0})
  }
  console.log(accountData)
  return accountData.transactions ? (
    <div className="accountDataDisplay">
      <div>
        <span className="regularFont font16 header">{accountData.name}</span>
      </div>
      <div className="spacer" />
      <span className="lightFont">{accountData.type}</span>
      <div className="spacer" />
      <div>
        <span className="regularFont">Deposits: </span>
        <span className="lightFont">
          {accountData.transactions
            .filter(trans => trans.type === 'DEPOSIT')
            .reduce((total, deposit) => {
              total += deposit.amount
              return total
            }, 0)}
        </span>
      </div>
      <div>
        <span className="regularFont">Withdrawals: </span>
        <span className="lightFont">
          {accountData.transactions
            .filter(trans => trans.type === 'WITHDRAWAL')
            .reduce((total, withdrawal) => {
              total += withdrawal.amount
              return total
            }, 0)}
        </span>
      </div>
      <div>
        <span className="regularFont">Net Deposit: </span>
        <span className="lightFont">{accountData.net}</span>
      </div>
      <div>
        <span className="regularFont">Earnings: </span>
        <span className="lightFont">{accountData.earnings}</span>
      </div>
      <div className="spacer" />
      <div>
        <span className="regularFont">Balance: </span>
        <span className="lightFont">{accountData.balance}</span>
      </div>
    </div>
  ) : null
}

//deposits
//withdrawals
//NET DEPOSIT
//earnings
//balance
