const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const strategies = {
  CONSERVATIVE: [
    {name: 'AGG', value: 25},
    {name: 'VTI', value: 30},
    {name: 'VEA', value: 40},
    {name: 'VWO', value: 5}
  ],
  BALANCED: [
    {name: 'AGG', value: 10},
    {name: 'VTI', value: 40},
    {name: 'VEA', value: 30},
    {name: 'VWO', value: 20}
  ],
  AGGRESSIVE: [
    {name: 'AGG', value: 5},
    {name: 'VTI', value: 20},
    {name: 'VEA', value: 30},
    {name: 'VWO', value: 45}
  ]
}

const stockData = {
  AGG: {
    fullName: 'iShares Core U.S. Aggregate Bond',
    description:
      'The investment seeks to track the investment results of the Bloomberg Barclays U.S. Aggregate Bond Index. The index measures the performance of the total U.S. investment-grade bond market.'
  },
  VTI: {
    fullName: 'Vanguard Total Stock Market Index Fund',
    description:
      'The investment seeks to track the performance of a benchmark index that measures the investment return of the overall stock market. The fund employs an indexing investment approach designed to track the performance of the CRSP US Total Market Index, which represents approximately 100% of the investable U.S. stock market and includes large-, mid-, small-, and micro-cap stocks regularly traded on the New York Stock Exchange and Nasdaq.'
  },
  VEA: {
    fullName: 'Vanguard FTSE Developed Markets Index Fund',
    description:
      'The investment seeks to track the performance of the FTSE Developed All Cap ex US Index. The fund employs an indexing investment approach designed to track the performance of the FTSE Developed All Cap ex US Index, a market-capitalization-weighted index that is made up of approximately 3873 common stocks of large-, mid-, and small-cap companies located in Canada and the major markets of Europe and the Pacific region.'
  },
  VWO: {
    fullName: 'Vanguard FTSE Emerging Markets Index Fund',
    description:
      'The investment seeks to track the performance of a benchmark index that measures the investment return of stocks issued by companies located in emerging market countries. The fund employs an indexing investment approach designed to track the performance of the FTSE Emerging Markets All Cap China A Inclusion Index. It holds a broadly diversified collection of securities that, in the aggregate, approximates the index in terms of key characteristics.'
  }
}

export {formatter, strategies, stockData}
