const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER, DATE} = Sequelize
const Account = require('./account')
const db = require('../db')
const colors = require('colors')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Deposit = db.define('deposit', {
  id: uuidDef,
  amount: INTEGER,
  net: INTEGER,
  balance: INTEGER,
  date: DATE
})

Deposit.addHook('afterCreate', async deposit => {
  const account = await Account.findByPk(deposit.accountId)
  await account.update({
    net: account.net + deposit.amount,
    balance: account.balance + deposit.amount
  })
  await deposit.update({net: account.net, balance: account.balance})
  console.log(`deposit net: ${deposit.net}, balance: ${deposit.balance}`.blue)
  console.log(
    `account net: ${account.net}, earnings: ${account.earnings}, balance: ${
      account.balance
    }`.blue
  )
})

module.exports = Deposit
