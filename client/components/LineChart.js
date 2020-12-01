/* eslint-disable complexity */
import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'

export default function LineChart({accountData}) {
  const d3Container = useRef(null)

  console.log(d3Container)

  useEffect(
    () => {
      d3
        .select(d3Container.current)
        .selectAll('*')
        .remove()
      showData(accountData)
    },
    [accountData]
  )

  function showData(transactions) {
    transactions = transactions.map(trans => {
      return {
        date: new Date(trans.date),
        balance: trans.balance * 1,
        net: trans.net * 1
      }
    })

    const chart = d3.select(d3Container.current)

    let bodyHeight = 300
    let bodyWidth = 450

    let minValue = Math.min(
      d3.min(transactions, d => +d.balance * 0.01),
      d3.min(transactions, d => +d.net * 0.01)
    )
    let maxValue = d3.max(transactions, d => +d.balance * 0.01)

    let yScale = d3
      .scaleLinear()
      .range([bodyHeight, 0]) // the range is inverted because svg space is inverted
      .domain([minValue, maxValue])

    const yGrid = d3
      .axisLeft(yScale)
      .tickSize(-bodyWidth)
      .tickFormat('')

    chart.append('g').call(d3.axisLeft(yScale))
    chart
      .append('g')
      .call(yGrid)
      .attr('stroke-width', 0.5)
      .attr('stroke-opacity', 0.2)

    let xScale = d3
      .scaleTime()
      .domain(d3.extent(transactions, d => d.date))
      .range([0, bodyWidth])

    chart
      .append('g')
      .attr('transform', `translate(0, ${bodyHeight})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b %d %y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')

    let lineBalance = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => xScale(d.date))
      .y(d => yScale(+d.balance * 0.01))

    let areaBalance = d3
      .area()
      .curve(d3.curveLinear)
      .x(d => xScale(d.date))
      .y0(yScale(minValue))
      .y1(d => yScale(+d.balance * 0.01))

    chart
      .append('path')
      .datum(transactions)
      .attr('d', areaBalance)
      .style('fill', 'url(#mygrad)')

    chart
      .append('path')
      .datum(transactions)
      .transition()
      .duration(1000)
      .attr('d', lineBalance)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.7)
      .style('fill', 'none')

    let lineNet = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(+d.net * 0.01))
      .curve(d3.curveLinear)

    chart
      .append('path')
      .datum(transactions)
      .transition()
      .duration(1000)
      .attr('d', lineNet)
      .attr('stroke', '#333333')
      .attr('stroke-width', 1)
      .attr('stroke-opacity', 0.4)
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
      <svg id="container" height="400" width="500">
        <g ref={d3Container} id="body" transform="translate(50,20)" />
        <g id="xAxis" />
        <g id="yAxis" />
      </svg>
    </div>
  )
}
