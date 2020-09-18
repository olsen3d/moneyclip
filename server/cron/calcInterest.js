const cron = require('node-cron')
const {Deposit} = require('../db/models')
const {Withdrawl} = require('../db/models')
const {Interest} = require('../db/models')
const colors = require('colors')

const calcTest = () => {
  console.log('running a cron job every 5 seconds'.blink)
  cron.schedule('1,6,11,16,21,26,31,36,41,46,51,56 * * * * *', () => {
    const randomTransaction = Math.random()
    const randomAmount = Math.floor(Math.random() * 1000)
    console.log('-------------------')
    if (randomTransaction < 0.3) {
      console.log(`withdrawing ${randomAmount}`.yellow)
      Withdrawl.create({
        amount: randomAmount,
        accountId: '1c870e50-86ca-4174-9c37-28eda10d614e'
      })
    } else if (randomTransaction < 0.6) {
      console.log(`depositing ${randomAmount}`.blue)
      Deposit.create({
        amount: randomAmount,
        accountId: '1c870e50-86ca-4174-9c37-28eda10d614e'
      })
    } else {
      console.log(`interest earned ${randomAmount}`.green)
      Interest.create({
        amount: randomAmount,
        accountId: '1c870e50-86ca-4174-9c37-28eda10d614e'
      })
    }
  })
}

module.exports = calcTest
