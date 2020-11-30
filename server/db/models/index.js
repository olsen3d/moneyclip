const User = require('./user')
const Account = require('./account')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')

Account.belongsTo(User)
User.hasMany(Account)

Transaction.belongsTo(Account)
Portfolio.belongsTo(Account)

Account.hasMany(Transaction)

Account.hasOne(Portfolio)

module.exports = {
  User,
  Account,
  Transaction,
  Portfolio
}
