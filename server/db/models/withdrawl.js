const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER} = Sequelize
const Account = require('./account')
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Withdrawl = db.define('withdrawl', {
  id: uuidDef,
  amount: INTEGER
})

Withdrawl.addHook('afterCreate', async withdrawl => {
  const account = await Account.findByPk(withdrawl.accountId)
  console.log(account.balance)
  await account.update({balance: account.balance - withdrawl.amount})
  console.log(account.balance)
})

module.exports = Withdrawl
