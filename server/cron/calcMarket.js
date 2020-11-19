const cron = require('node-cron')
const {Account, Transaction} = require('../db/models')
const {fetchQuotes} = require('../api/finnhub')

//('0 0 * * *', () => { ... }) // run everyday at midnight

const strategies = {
  CONSERVATIVE: {
    AGG: 0.25,
    VTI: 0.3,
    VEA: 0.4,
    VWO: 0.05
  },
  BALANCED: {
    AGG: 0.1,
    VTI: 0.4,
    VEA: 0.3,
    VWO: 0.2
  },
  AGGRESSIVE: {
    AGG: 0.05,
    VTI: 0.2,
    VEA: 0.3,
    VWO: 0.45
  }
}

const calcMarket = async () => {
  const quotes = await fetchQuotes()
  const accounts = await Account.findAll()
  accounts.forEach(async account => {
    if (account.type === 'INVESTING') {
      const portfolio = await account.getPortfolio()
      const adjustment =
        Object.entries(quotes)
          .reduce((acc, [stock, price]) => {
            const spent =
              account.net * strategies[account.strategy][stock] / 100
            const currentValue = price * portfolio[stock]
            acc += currentValue - spent
            return acc
          }, 0)
          .toFixed(2) * 100

      await Transaction.create({
        amount: adjustment,
        type: 'MARKET',
        date: new Date(),
        accountId: account.id
      })
    }
  })
}

//calcMarket()

module.exports = calcMarket

/*
fetch all investing accounts
get account
get current net and strategy to find the current amount invested in each stock



*/
