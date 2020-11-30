import React from 'react'
import {formatter} from '../../script/utils'

console.log(formatter)

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
          {formatter.format(
            accountData.transactions
              .filter(trans => trans.type === 'DEPOSIT')
              .reduce((total, deposit) => {
                total += deposit.amount
                return total
              }, 0) * 0.01
          )}
        </span>
      </div>
      <div>
        <span className="regularFont">Withdrawals: </span>
        <span className="lightFont">
          {formatter.format(
            accountData.transactions
              .filter(trans => trans.type === 'WITHDRAWAL')
              .reduce((total, withdrawal) => {
                total += withdrawal.amount
                return total
              }, 0) * 0.01
          )}
        </span>
      </div>
      <div>
        <span className="regularFont">Net Deposit: </span>
        <span className="lightFont">
          {formatter.format(accountData.net * 0.01)}
        </span>
      </div>
      <div>
        <span className="regularFont">Earnings: </span>
        <span className="lightFont">
          {formatter.format(accountData.earnings * 0.01)}
        </span>
      </div>
      <div className="spacer" />
      <div>
        <span className="regularFont">Balance: </span>
        <span className="lightFont">
          {formatter.format(accountData.balance * 0.01)}
        </span>
      </div>
    </div>
  ) : null
}

//deposits
//withdrawals
//NET DEPOSIT
//earnings
//balance
