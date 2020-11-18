const Sequelize = require('sequelize')
const {UUID, UUIDV4, DOUBLE} = Sequelize
const db = require('../db')

const uuidDef = {
  type: UUID,
  primaryKey: true,
  defaultValue: UUIDV4
}

const Portfolio = db.define('portfolio', {
  id: uuidDef,
  AGG: DOUBLE,
  VTI: DOUBLE,
  VEA: DOUBLE,
  VWO: DOUBLE
})

module.exports = Portfolio
