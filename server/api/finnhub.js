const axios = require('axios')
const {finnhubKey} = require('../../secrets')

const fetchQuotes = async () => {
  const [VTI, VEA, VWO, AGG] = await Promise.all([
    (await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=VTI&token=${finnhubKey}`
    )).data.c,
    (await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=VEA&token=${finnhubKey}`
    )).data.c,
    (await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=VWO&token=${finnhubKey}`
    )).data.c,
    (await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=AGG&token=${finnhubKey}`
    )).data.c
  ]).catch(error => console.log(error))

  return [VTI, VEA, VWO, AGG]
}
