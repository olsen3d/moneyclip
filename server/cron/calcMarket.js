const cron = require('node-cron')
const colors = require('colors')
const {fetchQuotes} = require('../api/finnhub')

//('0 0 * * *', () => { ... }) // run everyday at midnight

const calcMarket = async () => {
  console.log('fetching quotes')
  const quotes = await fetchQuotes()
  // [VTI, VEA, VWO, AGG]
  console.log(quotes)
}

//calcMarket()

module.exports = calcMarket

/*
fetch all investing accounts
get account
get current net and strategy to find the current amount invested in each stock



*/
