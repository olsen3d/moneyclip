import React from 'react'

export default function AccountDataDisplay({data}) {
  let accountData = data
  if (data.length) {
    accountData = {
      name: 'All Accounts',
      type: 'ALL',
      transactions: [],
      net: 0,
      earnings: 0,
      balance: 0
    }
    data.forEach(account => {
      accountData.transactions.push(...account.transactions)
      accountData.net += account.net
      accountData.earnings += account.earnings
      accountData.balance += account.balance
    })
  }
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
