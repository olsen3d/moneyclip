const router = require('express').Router()
const axios = require('axios')
const {finnhubKey} = require('../../secrets')

const baseURL = 'https://finnhub.io/api/v1/'

const fetchQuotes = async () => {
  const [AGG, VTI, VEA, VWO] = await Promise.all([
    (await axios.get(`${baseURL}quote?symbol=AGG&token=${finnhubKey}`)).data.c,
    (await axios.get(`${baseURL}quote?symbol=VTI&token=${finnhubKey}`)).data.c,
    (await axios.get(`${baseURL}quote?symbol=VEA&token=${finnhubKey}`)).data.c,
    (await axios.get(`${baseURL}quote?symbol=VWO&token=${finnhubKey}`)).data.c
  ]).catch(error => console.log(error))

  return {AGG, VTI, VEA, VWO}
}

const fetchNews = async () => {
  const news = (await axios.get(
    `${baseURL}news?category=general&token=${finnhubKey}`
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

module.exports = {router: router, fetchQuotes: fetchQuotes}
