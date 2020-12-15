const router = require('express').Router()
const {Watch} = require('../db/models')

module.exports = {router}

router.get('/:id', async (req, res, next) => {
  try {
    res.send(
      await Watch.findAll({
        where: {userId: req.params.id}
      })
    )
  } catch (error) {
    next(error)
  }
})
