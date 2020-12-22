'use strict'

const db = require('../server/db')
const colors = require('colors')
const {User} = require('../server/db/models')
const {Account, Transaction, Portfolio, Watch} = require('../server/db/models')
const {fetchMarketHistory, fetchQuotes} = require('../server/api/finnhub')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const mike = await User.create({email: 'mike@mike.com', password: '123'})

  const [checkingAcc, savingAcc, investingAcc] = await Promise.all([
    Account.create({
      name: 'Mikes checking',
      balance: 0,
      type: 'CHECKING',
      userId: mike.id
    }),
    Account.create({
      name: 'House down payment',
      balance: 0,
      type: 'SAVING',
      userId: mike.id
    }),
    Account.create({
      name: 'Retirement',
      balance: 0,
      type: 'INVESTING',
      strategy: 'AGGRESSIVE',
      userId: mike.id
    })
  ])

  const portfolio = await investingAcc.getPortfolio()

  const stock1 = await Watch.create({
    name: 'AAPL',
    userId: mike.id
  })

  const stock2 = await Watch.create({
    name: 'MSFT',
    userId: mike.id
  })

  const createTransaction = async (date, acc) => {
    const randomTransaction = Math.random()
    const randomAmount = Math.floor(Math.random() * 150000)
    console.log('------------------------------')
    console.log(date)
    if (randomTransaction < 0.005) {
      console.log(`withdrawing ${randomAmount}`.yellow)
      await Transaction.create({
        amount: Math.floor(randomAmount / 2 * -1),
        type: 'WITHDRAWAL',
        date: date,
        accountId: acc.id
      })
    } else if (randomTransaction < 0.04) {
      console.log(`depositing ${randomAmount}`.blue)
      await Transaction.create({
        amount: randomAmount,
        type: 'DEPOSIT',
        date: date,
        accountId: acc.id
      })
    }
  }

  const calcInterest = async (date, acc) => {
    const account = await Account.findByPk(acc.id)
    const balance = account.balance
    const interest = 0.00333 //4% over 12 months a year
    let earnings = Math.floor(balance * interest)
    if (earnings < 0) earnings = 0
    console.log('------------------------------')
    console.log(date)
    console.log(`interest earned ${earnings}`.green)
    await Transaction.create({
      amount: earnings,
      type: 'INTEREST',
      date: date,
      accountId: acc.id
    })
  }

  for (let month = 0; month < 10; month++) {
    for (let day = 1; day <= 28; day++) {
      const hours = Math.floor(Math.random() * 12)
      const minutes = Math.floor(Math.random() * 59)
      const seconds = Math.floor(Math.random() * 59)
      const dateInterest = new Date(2020, month, day)
      const dateTransaction = new Date(
        2020,
        month,
        day,
        hours,
        minutes,
        seconds
      )
      if (day === 1) await calcInterest(dateInterest, savingAcc)
      await createTransaction(dateTransaction, checkingAcc)
      await createTransaction(dateTransaction, savingAcc)
    }
  }

  const simulateMarketDeposit = async (date, price) => {
    const randomAmount = Math.floor(Math.random() * 100000)
    await Transaction.create({
      amount: randomAmount,
      type: 'SEED_DEPOSIT',
      date: new Date(date * 1000),
      accountId: investingAcc.id
    })
    await portfolio.update({
      VTI: portfolio.VTI + randomAmount / price / 100
    })
    await investingAcc.update({
      net: investingAcc.net + randomAmount,
      balance: investingAcc.balance + randomAmount
    })
  }

  const simulateMarketAdjustment = async (date, price) => {
    const BV = investingAcc.net / 100
    const EV = portfolio.VTI * price

    await Transaction.create({
      amount: Math.floor(EV - BV),
      type: 'MARKET',
      date: new Date(date * 1000),
      accountId: investingAcc.id
    })
  }

  const simulateMarket = async () => {
    const stock = await fetchMarketHistory('VWO')

    for (let i = 0; i < stock.t.length; i++) {
      const date = stock.t[i]
      const price = stock.c[i]
      if (i === 0) await simulateMarketDeposit(date, price)
      const randomTransaction = Math.random()
      if (randomTransaction < 0.02) await simulateMarketDeposit(date, price)
      await simulateMarketAdjustment(date, price)
    }
  }

  await simulateMarket()

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

  const quotes = await fetchQuotes()
  const net = await investingAcc.net
  const buys = Object.entries(quotes).map(([stock, price]) => {
    return net * strategies[investingAcc.strategy][stock] / price / 100
  })
  await portfolio.update({
    AGG: buys[0],
    VTI: buys[1],
    VEA: buys[2],
    VWO: buys[3]
  })

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
