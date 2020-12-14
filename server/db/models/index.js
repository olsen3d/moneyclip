const User = require('./user')
const Account = require('./account')
const Transaction = require('./transaction')
const Portfolio = require('./portfolio')
const Watch = require('./watch')

Account.belongsTo(User)
Watch.belongsTo(User)
User.hasMany(Account)
User.hasMany(Watch)

Transaction.belongsTo(Account)
Portfolio.belongsTo(Account)

Account.hasMany(Transaction)

Account.hasOne(Portfolio)

module.exports = {
  User,
  Account,
  Transaction,
  Portfolio,
  Watch
}
