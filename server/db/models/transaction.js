const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER, DATE, ENUM} = Sequelize
const Account = require('./account')
const db = require('../db')
const colors = require('colors')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Transaction = db.define('transaction', {
  id: uuidDef,
  type: ENUM('DEPOSIT', 'WITHDRAWAL'),
  amount: INTEGER,
  net: INTEGER,
  balance: INTEGER,
  date: DATE
})

Transaction.addHook('afterCreate', async transaction => {
  const account = await Account.findByPk(transaction.accountId)
  if (transaction.type === 'DEPOSIT') {
    await account.update({
      net: account.net + transaction.amount,
      balance: account.balance + transaction.amount
    })
    await transaction.update({net: account.net, balance: account.balance})
    console.log(
      `deposit net: ${transaction.net}, balance: ${transaction.balance}`.blue
    )
    console.log(
      `account net: ${account.net}, earnings: ${account.earnings}, balance: ${
        account.balance
      }`.blue
    )
  } else {
    await account.update({
      net: account.net - transaction.amount,
      balance: account.balance - transaction.amount
    })
    await transaction.update({net: account.net, balance: account.balance})
    console.log(
      `withdrawal net: ${transaction.net}, balance: ${transaction.balance}`
        .yellow
    )
    console.log(
      `account net: ${account.net}, earnings: ${account.earnings}, balance: ${
        account.balance
      }`.yellow
    )
  }
})

module.exports = Transaction
