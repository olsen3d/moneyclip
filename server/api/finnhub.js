const router = require('express').Router()
const axios = require('axios')
const {finnhubKey} = require('../../secrets')

const baseURL = 'https://finnhub.io/api/v1/quote?'

const fetchQuotes = async () => {
  const [VTI, VEA, VWO, AGG] = await Promise.all([
    (await axios.get(`${baseURL}symbol=VTI&token=${finnhubKey}`)).data.c,
    (await axios.get(`${baseURL}symbol=VEA&token=${finnhubKey}`)).data.c,
    (await axios.get(`${baseURL}symbol=VWO&token=${finnhubKey}`)).data.c,
    (await axios.get(`${baseURL}symbol=AGG&token=${finnhubKey}`)).data.c
  ]).catch(error => console.log(error))

  return [VTI, VEA, VWO, AGG]
}

router.get('/quotes', async (req, res, next) => {
  try {
    res.send(await fetchQuotes())
  } catch (error) {
    next(error)
  }
})

module.exports = {router: router, fetchQuotes: fetchQuotes}
