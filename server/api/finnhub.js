const router = require('express').Router()
const axios = require('axios')
const {finnhubKey} = require('../../secrets')
const apiKey = process.env.FINNHUB_API_KEY || finnhubKey

const baseURL = 'https://finnhub.io/api/v1/'

const fetchQuotes = async () => {
  const [AGG, VTI, VEA, VWO] = await Promise.all([
    (await axios.get(`${baseURL}quote?symbol=AGG&token=${apiKey}`)).data.c,
    (await axios.get(`${baseURL}quote?symbol=VTI&token=${apiKey}`)).data.c,
    (await axios.get(`${baseURL}quote?symbol=VEA&token=${apiKey}`)).data.c,
    (await axios.get(`${baseURL}quote?symbol=VWO&token=${apiKey}`)).data.c
  ]).catch(error => console.log(error))

  return {AGG, VTI, VEA, VWO}
}

const fetchMarketHistory = async stock => {
  const current = Math.floor(Date.now() / 1000)
  const year = 31536000
  const history = (await axios.get(
    `${baseURL}stock/candle?symbol=${stock}&resolution=D&from=${current -
      year * 4}&to=${current}&token=${apiKey}`
  )).data
  return history
}

const fetchNews = async () => {
  const news = (await axios.get(
    `${baseURL}news?category=general&token=${apiKey}`
  )).data
  return news
}

router.get('/quotes', async (req, res, next) => {
  try {
    res.send(await fetchQuotes())
  } catch (error) {
    next(error)
  }
})

router.get('/news', async (req, res, next) => {
  try {
    res.send(await fetchNews())
  } catch (error) {
    next(error)
  }
})

router.get('/stock/:stock', async (req, res, next) => {
  try {
    res.send(await fetchMarketHistory(req.params.stock))
  } catch (error) {
    next(error)
  }
})

module.exports = {
  router: router,
  fetchQuotes: fetchQuotes,
  fetchMarketHistory: fetchMarketHistory
}
