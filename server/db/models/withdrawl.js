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

const Withdrawl = db.define('withdrawl', {
  id: uuidDef,
  amount: INTEGER,
  net: INTEGER,
  balance: INTEGER,
  date: DATE
})

Withdrawl.addHook('afterCreate', async withdrawl => {
  const account = await Account.findByPk(withdrawl.accountId)
  await account.update({
    net: account.net - withdrawl.amount,
    balance: account.balance - withdrawl.amount
  })
  await withdrawl.update({net: account.net, balance: account.balance})
  console.log(
    `withdrawl net: ${withdrawl.net}, balance: ${withdrawl.balance}`.yellow
  )
  console.log(
    `account net: ${account.net}, earnings: ${account.earnings}, balance: ${
      account.balance
    }`.yellow
  )
})

module.exports = Withdrawl
