const Sequelize = require('sequelize')
const {UUID, UUIDV4, TEXT} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Watch = db.define('watch', {
  id: uuidDef,
  name: TEXT
})

module.exports = Watch
