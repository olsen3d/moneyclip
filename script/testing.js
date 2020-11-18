//when depositing do this to calc how much of each stock you buy:

const strategies = {
  CONSERVATIVE: {
    AGG: 0.25,
    VTI: 0.3,
    VEA: 0.4,
    VWO: 0.05
  },
  BALANCED: [
    {name: 'AGG', value: 0.1},
    {name: 'VTI', value: 0.4},
    {name: 'VEA', value: 0.3},
    {name: 'VWO', value: 0.2}
  ],
  AGGRESSIVE: [
    {name: 'AGG', value: 0.05},
    {name: 'VTI', value: 0.2},
    {name: 'VEA', value: 0.3},
    {name: 'VWO', value: 0.45}
  ]
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

console.log(AGG_AMOUNT, VTI_AMOUNT, VEA_AMOUNT, VWO_AMOUNT)

const total =
  AGG_PRICE * AGG_AMOUNT +
  VTI_PRICE * VTI_AMOUNT +
  VEA_PRICE * VEA_AMOUNT +
  VWO_PRICE * VWO_AMOUNT

//0.42506163393692087 1.0818810882858243 6.684491978609625 9.437919463087248

//an investing account has a portfolio with the amount of each stock in it
//account.getPortfolio()
