const User = require('./user')
const Account = require('./account')
const Deposit = require('./deposit')
const Interest = require('./interest')
const Market = require('./market')
const Withdrawl = require('./withdrawl')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')

Account.belongsTo(User)
User.hasMany(Account)

Deposit.belongsTo(Account)
Withdrawl.belongsTo(Account)
Interest.belongsTo(Account)
Market.belongsTo(Account)
Transaction.belongsTo(Account)
Portfolio.belongsTo(Account)

Account.hasMany(Deposit)
Account.hasMany(Withdrawl)
Account.hasMany(Interest)
Account.hasMany(Market)
Account.hasMany(Transaction)

Account.hasOne(Portfolio)

module.exports = {
  User,
  Account,
  Deposit,
  Withdrawl,
  Interest,
  Market,
  Transaction,
  Portfolio
}
