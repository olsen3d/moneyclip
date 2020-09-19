const cron = require('node-cron')
const {Deposit} = require('../db/models')
const {Withdrawl} = require('../db/models')
const {Interest} = require('../db/models')
const colors = require('colors')

const calcTest = () => {
  console.log('running a job every 5 seconds'.rainbow.bold)
  cron.schedule('1,6,11,16,21,26,31,36,41,46,51,56 * * * * *', () => {
    const randomTransaction = Math.random()
    const randomAmount = Math.floor(Math.random() * 1000)
    console.log('------------------------------')
    if (randomTransaction < 0.3) {
      console.log(`withdrawing ${randomAmount}`.yellow)
      Withdrawl.create({
        amount: randomAmount,
        accountId: '3d871889-8fc5-4df9-8043-81210f87b461'
      })
    } else if (randomTransaction < 0.8) {
      console.log(`depositing ${randomAmount}`.blue)
      Deposit.create({
        amount: randomAmount,
        date: new Date(),
        accountId: '3d871889-8fc5-4df9-8043-81210f87b461'
      })
    } else {
      console.log(`interest earned ${randomAmount}`.green)
      Interest.create({
        amount: randomAmount,
        accountId: '3d871889-8fc5-4df9-8043-81210f87b461'
      })
    }
  })
}

module.exports = calcTest
