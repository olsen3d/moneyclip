const router = require('express').Router()
const {Account, Transaction} = require('../db/models')

module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    res.send(
      await Account.findAll({
        where: {userId: req.params.id},
        include: {
          model: Transaction
        },
        order: [['name', 'ASC'], [Transaction, 'date', 'DESC']]
      })
    )
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newAccount = await Account.create(req.body)
    res.send(newAccount)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const destroyed = await Account.findByPk(req.params.id)
    destroyed.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
