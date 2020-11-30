//when depositing do this to calc how much of each stock you buy:

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

const strategy = {
  AGG: 0.05,
  VTI: 0.2,
  VEA: 0.3,
  VWO: 0.45
}

const deposit = 100000

const AGG_PRICE = 117.63
const VTI_PRICE = 184.8632
const VEA_PRICE = 44.88
const VWO_PRICE = 47.68

const AGG_AMOUNT = deposit * strategy.AGG / AGG_PRICE / 100
const VTI_AMOUNT = deposit * strategy.VTI / VTI_PRICE / 100
const VEA_AMOUNT = deposit * strategy.VEA / VEA_PRICE / 100
const VWO_AMOUNT = deposit * strategy.VWO / VWO_PRICE / 100

//console.log(AGG_AMOUNT, VTI_AMOUNT, VEA_AMOUNT, VWO_AMOUNT)

const account = {
  net: 85000,
  strategy: 'AGGRESSIVE'
}

const portfolio = {
  AGG: 0.3603221704111912,
  VTI: 0.9280489136368598,
  VEA: 5.7174887892376685,
  VWO: 8.061116965226553
}

//const quotes = { AGG: 117.95, VTI: 184.18, VEA: 44.6, VWO: 47.45 }
const quotes = {AGG: 117.95, VTI: 183.18, VEA: 44.6, VWO: 47.45}

//find out how much was spent on each stock
//take the net and divide it up by the strategy percentages

const adjustment = Object.entries(quotes)
  .reduce((acc, [stock, price]) => {
    const spent = account.net * strategies[account.strategy][stock] / 100
    const currentValue = price * portfolio[stock]
    acc += currentValue - spent
    return acc
  }, 0)
  .toFixed(2)

// const spending = net * strategy.VEA / 100
// const currentValue = quotes.VEA * portfolio.VEA
// const adjustment = currentValue.toFixed(2) - spending
//console.log(adjustment)

//on every interest/market get the previous balance then calc return

// 4% apr over one year is 0.01 per quarter

//TR = 100 (this balance - prev balance) / prev balance
//n-Period Total Return = 100 [(1+TR1) (1+TR2) (1+TR3) ... (1+TRn) - 1]

const TR1 = 0.01
const TR2 = 0.01
const TR3 = 0.01
const TR4 = 0.01

const period = 100 * ((1 + TR1) * (1 + TR2) * (1 + TR3) * (1 + TR4) - 1)

//console.log(period)

const current = Math.floor(Date.now() / 1000)

const year = 31536000
const month3 = 7884864
const month1 = 2628288

//console.log(current - year)
//mult finnhub time * 1000 to get a js date
const date = new Date(1606176000 * 1000)
console.log(date)

//data.c = closing price
//data.t = timestamp
