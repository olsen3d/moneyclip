/* eslint-disable complexity */
import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'

export default function LineChart2({account}) {
  const d3Container = useRef(null)

  useEffect(
    () => {
      d3
        .select(d3Container.current)
        .selectAll('*')
        .remove()
      showData(account.transactions)
    },
    [account]
  )

  let lineNet
  let path
  let transactions
  let bodyHeight = 200
  let bodyWidth = 400

  function showData(transactionData) {
    transactions = transactionData.map(trans => {
      return {
        date: new Date(trans.date),
        balance: trans.balance * 1,
        net: trans.net * 1
      }
    })

    const chart = d3.select(d3Container.current)

    let maxValue = d3.max(transactions, d => +d.balance * 0.01)

    let yScale = d3
      .scaleLinear()
      .range([bodyHeight, 0])
      .domain([0, maxValue])

    chart.append('g').call(d3.axisLeft(yScale))

    let xScale = d3
      .scaleTime()
      .domain(d3.extent(transactions, d => d.date))
      .range([0, bodyWidth])

    chart
      .append('g')
      .attr('transform', `translate(0, ${bodyHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')))

    lineNet = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(+d.net * 0.01))
      .curve(d3.curveStepAfter)

    path = chart
      .append('path')
      .datum(transactions)
      .transition()
      .duration(1000)
      .attr('d', lineNet)
      .attr('stroke', '#333333')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.7)
      .style('fill', 'none')
  }

  function update() {
    console.log('updating')

    let newTrans = transactions.filter((val, i) => i > 100)

    let xScale2 = d3
      .scaleTime()
      .domain(d3.extent(newTrans, d => d.date))
      .range([0, bodyWidth])

    lineNet.x(function(d) {
      return xScale2(d.date)
    })

    path
      .transition()
      .duration(1000)
      .attr('d', lineNet(newTrans))
  }

  return (
    <div>
      <svg id="container" height="300" width="500">
        <g ref={d3Container} id="body" transform="translate(50,50)" />
        <g id="xAxis" />
        <g id="yAxis" />
      </svg>
      <button type="button" onClick={update}>
        click
      </button>
    </div>
  )
}
