/* eslint-disable no-fallthrough */
const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER, DATE, ENUM} = Sequelize
const Account = require('./account')
const db = require('../db')
const {fetchQuotes} = require('../../api/finnhub')

const strategies = {
  CONSERVATIVE: {
    AGG: 0.25,
    VTI: 0.3,
    VEA: 0.4,
    VWO: 0.05
  },
  BALANCED: {
    AGG: 0.1,
    VTI: 0.4,
    VEA: 0.3,
    VWO: 0.2
  },
  AGGRESSIVE: {
    AGG: 0.05,
    VTI: 0.2,
    VEA: 0.3,
    VWO: 0.45
  }
}

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Transaction = db.define('transaction', {
  id: uuidDef,
  type: ENUM('DEPOSIT', 'WITHDRAWAL', 'INTEREST', 'MARKET', 'SEED_DEPOSIT'),
  amount: INTEGER,
  net: INTEGER,
  earnings: INTEGER,
  balance: INTEGER,
  date: DATE
})

Transaction.addHook('afterCreate', async transaction => {
  const account = await Account.findByPk(transaction.accountId)
  const portfolio = await account.getPortfolio()
  switch (transaction.type) {
    case 'DEPOSIT':
      if (account.type === 'INVESTING') {
        const quotes = await fetchQuotes()
        const buys = Object.entries(quotes).map(([stock, price]) => {
          return (
            transaction.amount *
            strategies[account.strategy][stock] /
            price /
            100
          )
        })
        await portfolio.update({
          AGG: portfolio.AGG + buys[0],
          VTI: portfolio.VTI + buys[1],
          VEA: portfolio.AGG + buys[2],
          VWO: portfolio.AGG + buys[3]
        })
      }
    case 'WITHDRAWAL':
      await account.update({
        net: account.net + transaction.amount,
        balance: account.balance + transaction.amount
      })
      break
    case 'INTEREST':
    case 'MARKET':
      await account.update({
        earnings: account.earnings + transaction.amount,
        balance: account.balance + transaction.amount
      })
      break
    case 'SEED_DEPOSIT':
      // await account.update({
      //   net: account.net + transaction.amount,
      //   balance: account.balance + transaction.amount
      // })
      break
    default:
      break
  }
  await transaction.update({
    net: account.net,
    earnings: account.earnings,
    balance: account.balance
  })
})

module.exports = Transaction
