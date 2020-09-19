'use strict'

const db = require('../server/db')
const colors = require('colors')
const {User} = require('../server/db/models')
const {Account} = require('../server/db/models')
const {Deposit} = require('../server/db/models')
const {Withdrawl} = require('../server/db/models')
const {Interest} = require('../server/db/models')

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
      status: 'CHECKING',
      userId: mike.id
    }),
    Account.create({
      name: 'Mikes savings',
      balance: 0,
      status: 'SAVING',
      userId: mike.id
    }),
    Account.create({
      name: 'Mikes investing',
      balance: 0,
      status: 'INVESTING',
      userId: mike.id
    })
  ])

  const createTransaction = async date => {
    const randomTransaction = Math.random()
    const randomAmount = Math.floor(Math.random() * 1000)
    console.log('------------------------------')
    console.log(date)
    if (randomTransaction < 0.4) {
      console.log(`withdrawing ${randomAmount}`.yellow)
      await Withdrawl.create({
        amount: randomAmount,
        date: date,
        accountId: checkingAcc.id
      })
    } else {
      console.log(`depositing ${randomAmount}`.blue)
      await Deposit.create({
        amount: randomAmount,
        date: date,
        accountId: checkingAcc.id
      })
    }
  }

  const calcInterest = async date => {
    const account = await Account.findByPk(checkingAcc.id)
    const balance = account.balance
    const interest = 0.04
    const earnings = Math.floor(balance * interest)
    if (balance > 0) {
      console.log('------------------------------')
      console.log(date)
      console.log(`interest earned ${earnings}`.green)
      await Interest.create({
        amount: earnings,
        accountId: checkingAcc.id
      })
    }
  }

  for (let month = 0; month < 8; month++) {
    for (let day = 1; day < 28; day++) {
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
      if (day === 1) await calcInterest(dateInterest)
      await createTransaction(dateTransaction)
    }
  }

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
