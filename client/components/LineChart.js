/* eslint-disable complexity */
import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'

export default function LineChart({account}) {
  const d3Container = useRef(null)

  useEffect(() => showData(account.transactions), [account])

  function showData(transactions) {
    transactions = transactions.map(trans => {
      return {
        date: new Date(trans.date),
        balance: trans.balance * 1,
        net: trans.net * 1
      }
    })

    const chart = d3.select(d3Container.current)

    let bodyHeight = 200
    let bodyWidth = 400

    let maxValue = d3.max(transactions, d => +d.balance * 0.01)

    let yScale = d3
      .scaleLinear()
      .range([bodyHeight, 0]) // the range is inverted because svg space is inverted
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

    let lineBalance = d3
      .line()
      .curve(d3.curveStepAfter)
      .x(d => xScale(d.date))
      .y(d => yScale(+d.balance * 0.01))

    let areaBalance = d3
      .area()
      .curve(d3.curveStepAfter)
      .x(d => xScale(d.date))
      .y0(yScale(0))
      .y1(d => yScale(+d.balance * 0.01))

    chart
      .append('path')
      .datum(transactions)
      .attr('d', areaBalance)
      .style('fill', 'url(#mygrad)')

    chart
      .append('path')
      .datum(transactions)
      .attr('d', lineBalance)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.7)
      .style('fill', 'none')

    let lineNet = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(+d.net * 0.01))
      .curve(d3.curveStepAfter)

    chart
      .append('path')
      .datum(transactions)
      .attr('d', lineNet)
      .attr('stroke', '#333333')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.7)
      .style('fill', 'none')

    const gradient = chart
      .append('defs')
      .append('linearGradient')
      .attr('id', 'mygrad')
      .attr('x1', '0%')
      .attr('x2', '0%')
      .attr('y1', '0%')
      .attr('y2', '100%')

    gradient
      .append('stop')
      .attr('offset', '0%')
      .style('stop-color', '#cce5df')
      .style('stop-opacity', 1)

    gradient
      .append('stop')
      .attr('offset', '25%')
      .style('stop-color', '#cce5df')
      .style('stop-opacity', 1)

    gradient
      .append('stop')
      .attr('offset', '100%')
      .style('stop-color', 'white')
      .style('stop-opacity', 0)
  }

  return (
    <div>
      <svg id="container" height="300" width="500">
        <g ref={d3Container} id="body" transform="translate(50,50)" />
        <g id="xAxis" />
        <g id="yAxis" />
      </svg>
    </div>
  )
}
