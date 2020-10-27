const cron = require('node-cron')
const colors = require('colors')
const {fetchQuotes} = require('../api/finnhub')

//('0 0 * * *', () => { ... }) // run everyday at midnight

const calcMarket = () => {
  console.log('starting cron test'.rainbow.bold)
  cron.schedule('5 * * * * *', async () => {
    const quotes = await fetchQuotes()
    console.log(quotes)
  })
}

module.exports = calcMarket
