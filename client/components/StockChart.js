/* eslint-disable complexity */
import React, {useRef, useState, useEffect} from 'react'
import * as d3 from 'd3'
import {formatter} from '../../script/utils'
import axios from 'axios'

function StockChart({stock}) {
  const d3MainContainer = useRef(null)
  const [stockData, setStockData] = useState()

  console.log(stockData)

  const fetchData = async stock => {
    let data = (await axios.get(`/api/finnhub/stock/${stock.name}`)).data
    setStockData(data)
  }

  useEffect(() => {
    console.log(stock)
    fetchData(stock)
  }, [])

  let mainChart

  let mainHeight = 300
  let mainWidth = 530

  let mainX = d3.scaleTime().range([0, mainWidth])

  let mainY = d3.scaleLinear().range([mainHeight, 0])

  let mainLine = d3
    .line()
    .curve(d3.curveLinear)
    .x(d => mainX(d.date))
    .y(d => mainY(+d.balance * 0.01))

  function showData(transactions) {
    transactions = transactions.map(trans => {
      return {
        date: new Date(trans.date),
        balance: trans.balance * 1,
        net: trans.net * 1,
        type: trans.type,
        amount: trans.amount
      }
    })

    mainChart = d3.select(d3MainContainer.current)

    let minValue = Math.min(
      d3.min(transactions, d => +d.balance * 0.01),
      d3.min(transactions, d => +d.net * 0.01)
    )
    let maxValue = d3.max(transactions, d => +d.balance * 0.01)

    mainX.domain(d3.extent(transactions, d => d.date))

    mainY.domain([minValue, maxValue])

    mainChart
      .append('path')
      .attr('class', 'line')
      .datum(transactions)
      .attr('d', mainLine)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.9)
      .style('fill', 'none')

    mainChart
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(${mainWidth}, 0)`)
      .call(d3.axisRight(mainY))

    mainChart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0, ${mainHeight})`)
      .call(d3.axisBottom(mainX).tickFormat(d3.timeFormat('%b %d %y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')
  }
  return (
    <React.Fragment>
      <div className="cardFull">
        {stock.name}
        <svg id="container" height="350" width="600">
          <g ref={d3MainContainer} transform="translate(30,5)" />
        </svg>
      </div>
    </React.Fragment>
  )
}

export default StockChart
