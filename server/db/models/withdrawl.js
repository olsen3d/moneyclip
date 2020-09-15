const Sequelize = require('sequelize')
const {UUID, UUIDV4, INTEGER} = Sequelize
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

module.exports = Withdrawl
