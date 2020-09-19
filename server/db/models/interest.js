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

const Interest = db.define('interest', {
  id: uuidDef,
  amount: INTEGER,
  earnings: INTEGER,
  balance: INTEGER,
  date: DATE
})

Interest.addHook('afterCreate', async interest => {
  const account = await Account.findByPk(interest.accountId)
  await account.update({
    earnings: account.earnings + interest.amount,
    balance: account.balance + interest.amount
  })
  await interest.update({earnings: account.earnings, balance: account.balance})
  console.log(
    `interest earnings: ${interest.earnings}, balance: ${interest.balance}`
      .green
  )
  console.log(
    `account net: ${account.net}, earnings: ${account.earnings}, balance: ${
      account.balance
    }`.green
  )
})

module.exports = Interest
