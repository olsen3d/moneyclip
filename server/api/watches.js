const router = require('express').Router()
const {Watch} = require('../db/models')
const {fetchMarketHistory} = require('./finnhub')

module.exports = {router}

router.get('/:id', async (req, res, next) => {
  try {
    const watchlist = await Watch.findAll({
      where: {userId: req.params.id},
      raw: true
    })
    await Promise.all(
      watchlist.map(async stock => {
        stock.history = await fetchMarketHistory(stock.name)
        return stock
      })
    )
    res.send(watchlist)
  } catch (error) {
    next(error)
  }
})
