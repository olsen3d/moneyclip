const {
  User,
  Account,
  Transaction,
  Portfolio,
  Watch
} = require('../server/db/models')
const {fetchQuotes, fetchMarketHistory} = require('../server/api/finnhub')
const socket = require('../server/socket')

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

const sendMessage = (socketId, type, message) => {
  if (socket.getIO()) {
    socket
      .getIO()
      .to(socketId)
      .emit(type, message)
  }
}

const createNewUser = async (user, socketId) => {
  sendMessage(socketId, 'startSeeding')

  sendMessage(socketId, 'progressMessage', 'creating accounts')
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

  sendMessage(socketId, 'progressMessage', 'creating portfolios')
  const portfolio = await Portfolio.create({
    AGG: 0,
    VTI: 0,
    VEA: 0,
    VWO: 0,
    accountId: investingAcc.id
  })

  sendMessage(socketId, 'progressMessage', 'creating watchlist')
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
    if (randomTransaction < 0.3) {
      await Transaction.create({
        amount: Math.floor(randomAmount / 5 * -1),
        type: 'WITHDRAWAL',
        date: new Date(date * 1000),
        accountId: acc.id
      })
    } else {
      await Transaction.create({
        amount: randomAmount,
        type: 'DEPOSIT',
        date: new Date(date * 1000),
        accountId: acc.id
      })
    }
  }

  const calcInterest = async (date, acc) => {
    const account = await Account.findByPk(acc.id)
    const balance = account.balance
    const interest = 0.0001095 //0.00333 //4% over 12 months a year
    let earnings = Math.floor(balance * interest)
    if (earnings < 0) earnings = 0
    await Transaction.create({
      amount: earnings,
      type: 'INTEREST',
      date: new Date(date * 1000),
      accountId: acc.id
    })
  }

  sendMessage(socketId, 'progressMessage', 'creating saving/checking data')

  const simulateMarketDeposit = async (date, price) => {
    const randomAmount = Math.floor(Math.random() * 100000) //100000
    sendMessage(
      socketId,
      'progressMessage',
      `depositing $${randomAmount / 100}`
    )

    const newTrans = await Transaction.create({
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
      earnings: investingAcc.earnings,
      balance: investingAcc.balance + randomAmount
    })

    await newTrans.update({
      net: investingAcc.net,
      earnings: investingAcc.earnings,
      balance: investingAcc.balance
    })
  }

  const simulateMarketAdjustment = async (date, price) => {
    const BV = (await investingAcc.net) / 100
    const EV = (await portfolio.VTI) * price

    //console.log(`${BV}, ${EV} adjustment ${Math.floor(EV - BV)}`)

    const newTrans = await Transaction.create({
      amount: Math.floor(EV - BV),
      type: 'SEED_MARKET',
      date: new Date(date * 1000),
      accountId: investingAcc.id
    })

    await investingAcc.update({
      earnings: investingAcc.earnings + Math.floor(EV - BV),
      balance: investingAcc.balance + Math.floor(EV - BV)
    })

    await newTrans.update({
      net: investingAcc.net,
      earnings: investingAcc.earnings,
      balance: investingAcc.balance
    })
  }

  const simulateMarket = async () => {
    let prevPercent = -1
    const stock = await fetchMarketHistory('VEA')
    //stock.t.length = 100

    for (let i = 0; i < stock.t.length; i++) {
      const date = stock.t[i]
      const price = stock.c[i]
      if (i === 0) await simulateMarketDeposit(date, price)

      const percent = Math.floor(i / stock.t.length * 100)
      if (percent !== prevPercent) {
        prevPercent = percent
        sendMessage(socketId, 'progressPercent', `${percent}`)
        sendMessage(
          socketId,
          'progressMessage',
          `simulating market data from ${new Date(
            date * 1000
          ).toLocaleDateString('en-us')}`
        )
      }

      const randomTransactions = [Math.random(), Math.random(), Math.random()]
      if (randomTransactions[0] < 0.02) await simulateMarketDeposit(date, price)
      if (randomTransactions[1] < 0.03)
        await createTransaction(date, checkingAcc)
      if (randomTransactions[2] < 0.01) await createTransaction(date, savingAcc)

      await simulateMarketAdjustment(date + 100, price)
      await calcInterest(date, savingAcc)
    }
  }

  sendMessage(socketId, 'progressMessage', 'simulating market data')
  await simulateMarket()

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

  sendMessage(socketId, 'progressMessage', 'Finished!')
  sendMessage(socketId, 'loginOK', 'ok')
}

module.exports = {createNewUser}
