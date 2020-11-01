const router = require('express').Router()
const {Account, Transaction} = require('../db/models')

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    req.body.date = new Date()
    if (req.body.type === 'WITHDRAWAL') req.body.amount = -req.body.amount
    await Transaction.create(req.body)
    try {
      res.send(
        await Account.findOne({
          where: {id: req.body.accountId},
          include: {
            model: Transaction
          },
          order: [['name', 'ASC'], [Transaction, 'date', 'ASC']]
        })
      )
    } catch (error) {
      next(error)
    }
  } catch (error) {
    next(error)
  }
})
