const {
  User,
  Account,
  Transaction,
  Portfolio,
  Watch
} = require('../server/db/models')
const {fetchMarketHistory} = require('../server/api/finnhub')
const socket = require('../server/socket')

const sendMessage = (type, message) => {
  if (socket.getIO()) {
    socket.getIO().emit(type, message)
  }
}

const createNewUser = async user => {
  console.log(user.id, user.email)

  sendMessage('progressMessage', 'creating accounts')
  const [checkingAcc, savingAcc, investingAcc] = await Promise.all([
    Account.create({
      name: 'Daily Checking',
      balance: 0,
      type: 'CHECKING',
      userId: user.id
    }),
    Account.create({
      name: 'House Down Payment',
      balance: 0,
      type: 'SAVING',
      userId: user.id
    }),
    Account.create({
      name: 'Retirement',
      balance: 0,
      type: 'INVESTING',
      strategy: 'AGGRESSIVE',
      userId: user.id
    })
  ])

  sendMessage('progressMessage', 'creating portfolios')
  const portfolio = await Portfolio.create({
    AGG: 0,
    VTI: 0,
    VEA: 0,
    VWO: 0,
    accountId: investingAcc.id
  })

  sendMessage('progressMessage', 'creating watchlist')
  const stock1 = await Watch.create({
    name: 'AAPL',
    userId: user.id
  })

  const stock2 = await Watch.create({
    name: 'XOM',
    userId: user.id
  })

  const createTransaction = async (date, acc) => {
    const randomTransaction = Math.random()
    const randomAmount = Math.floor(Math.random() * 150000)
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
    console.log(`interest earned ${earnings}`.green)
    await Transaction.create({
      amount: earnings,
      type: 'INTEREST',
      date: date,
      accountId: acc.id
    })
  }

  sendMessage('progressMessage', 'creating saving/checking data')
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
    let prevPercent = -1
    for (let i = 0; i < stock.t.length; i++) {
      const date = stock.t[i]
      const price = stock.c[i]
      if (i === 0) await simulateMarketDeposit(date, price)
      const randomTransaction = Math.random()
      if (randomTransaction < 0.02) {
        await simulateMarketDeposit(date, price)
      }
      const percent = Math.floor(i / stock.t.length * 100)
      if (percent !== prevPercent) {
        prevPercent = percent
        sendMessage('progressPercent', `${percent}`)
        sendMessage(
          'progressMessage',
          `simulating market data from ${new Date(
            date * 1000
          ).toLocaleDateString('en-us')}`
        )
      }
      await simulateMarketAdjustment(date, price)
    }
  }
  sendMessage('progressMessage', 'simulating market data')
  await simulateMarket()
}

module.exports = {createNewUser}
