const Sequelize = require('sequelize')
const {UUID, UUIDV4, ENUM, TEXT, INTEGER} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Account = db.define('account', {
  id: uuidDef,
  name: TEXT,
  status: {
    type: ENUM('CHECKING', 'SAVING', 'INVESTING')
  },
  balance: INTEGER
})

module.exports = Account