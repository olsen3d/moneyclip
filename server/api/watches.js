const router = require('express').Router()
const {Watch} = require('../db/models')
const {fetchMarketHistory} = require('./finnhub')
const path = require('path')

module.exports = {router}

router.get('/stocks/list', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'resource/stocks.csv'))
})

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

router.post('/new/:name', async (req, res, next) => {
  try {
    const newStock = await Watch.create({
      name: req.params.name,
      userId: req.user.id
    })
    const processed = await Watch.findOne({
      where: {userId: req.user.id, name: req.params.name},
      raw: true
    })
    processed.history = await fetchMarketHistory(newStock.name)
    res.send(processed)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const destroyed = await Watch.findByPk(req.params.id)
    destroyed.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
