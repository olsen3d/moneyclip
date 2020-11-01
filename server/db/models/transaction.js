const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER, DATE, ENUM} = Sequelize
const Account = require('./account')
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Transaction = db.define('transaction', {
  id: uuidDef,
  type: ENUM('DEPOSIT', 'WITHDRAWAL', 'INTEREST', 'MARKET'),
  amount: INTEGER,
  net: INTEGER,
  earnings: INTEGER,
  balance: INTEGER,
  date: DATE
})

Transaction.addHook('afterCreate', async transaction => {
  const account = await Account.findByPk(transaction.accountId)
  switch (transaction.type) {
    case 'DEPOSIT':
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
