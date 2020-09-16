const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER} = Sequelize
const Account = require('./account')
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Deposit = db.define('deposit', {
  id: uuidDef,
  amount: INTEGER
})

Deposit.addHook('afterCreate', async deposit => {
  console.log(deposit.accountId)
  const account = await Account.findByPk(deposit.accountId)
  console.log(account.balance)
  await account.update({balance: account.balance + deposit.amount})
  console.log(account.balance)
})

module.exports = Deposit
