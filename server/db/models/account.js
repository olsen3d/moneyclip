const Sequelize = require('sequelize')
const {UUID, UUIDV4, ENUM, TEXT, INTEGER} = Sequelize
const db = require('../db')
const Portfolio = require('./portfolio')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Account = db.define('account', {
  id: uuidDef,
  name: TEXT,
  type: {
    type: ENUM('CHECKING', 'SAVING', 'INVESTING')
  },
  strategy: {
    type: ENUM('CONSERVATIVE', 'BALANCED', 'AGGRESSIVE')
  },
  net: INTEGER,
  earnings: INTEGER,
  balance: INTEGER
})

Account.addHook('afterCreate', async account => {
  if (account.type === 'INVESTING')
    await Portfolio.create({
      AGG: 0,
      VTI: 0,
      VEA: 0,
      VWO: 0,
      accountId: account.id
    })
})

module.exports = Account
