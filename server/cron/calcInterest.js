const cron = require('node-cron')
const {Deposit} = require('../db/models')
const colors = require('colors')

const calcTest = () => {
  console.log('running a cron job every 5 seconds'.blue)
  cron.schedule('1,6,11,16,21,26,31,36,41,46,51,56 * * * * *', () => {
    const random = Math.floor(Math.random() * 1000)
    console.log(`depositing ${random}`.blue)
    Deposit.create({
      amount: random,
      accountId: '64a89a1b-19bc-4acf-af77-6415cdfabcf6'
    })
  })
}

module.exports = calcTest
