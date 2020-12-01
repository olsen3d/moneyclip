/* eslint-disable complexity */
import React, {useRef, useEffect} from 'react'
import * as d3 from 'd3'

export default function InvestingChart({accountData}) {
  const d3MainContainer = useRef(null)
  const d3MiniContainer = useRef(null)

  useEffect(
    () => {
      d3
        .select(d3MainContainer.current)
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

    const mainChart = d3.select(d3MainContainer.current)
    const miniChart = d3.select(d3MiniContainer.current)

    let mainHeight = 300
    let mainWidth = 450

    let miniHeight = 100
    let miniWidth = 850

    let minValue = Math.min(
      d3.min(transactions, d => +d.balance * 0.01),
      d3.min(transactions, d => +d.net * 0.01)
    )
    let maxValue = d3.max(transactions, d => +d.balance * 0.01)

    let mainX = d3
      .scaleTime()
      .domain(d3.extent(transactions, d => d.date))
      .range([0, mainWidth])

    let mainY = d3
      .scaleLinear()
      .range([mainHeight, 0])
      .domain([minValue, maxValue])

    let miniX = d3
      .scaleTime()
      .domain(mainX.domain())
      .range([0, miniWidth])

    let miniY = d3
      .scaleLinear()
      .range([miniHeight, 0])
      .domain([minValue, maxValue])

    let mainLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => mainX(d.date))
      .y(d => mainY(+d.balance * 0.01))

    let miniLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => miniX(d.date))
      .y(d => miniY(+d.balance * 0.01))

    mainChart.append('g').call(d3.axisLeft(mainY))

    mainChart
      .append('g')
      .attr('transform', `translate(0, ${mainHeight})`)
      .call(d3.axisBottom(mainX).tickFormat(d3.timeFormat('%b %d %y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')

    mainChart
      .append('path')
      .datum(transactions)
      .attr('d', mainLine)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.7)
      .style('fill', 'none')

    miniChart
      .append('path')
      .datum(transactions)
      .attr('d', miniLine)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.7)
      .style('fill', 'none')
  }

  return (
    <React.Fragment>
      <div className="cardDouble">
        <div className="cardTwoThirds">
          <svg id="container" height="400" width="500">
            <g ref={d3MainContainer} transform="translate(50,20)" />
          </svg>
        </div>
        <div className="cardOneThirds" />
      </div>
      <div className="cardFull">
        <svg id="container" height="110" width="900">
          <g ref={d3MiniContainer} transform="translate(5,2)" />
        </svg>
      </div>
    </React.Fragment>
  )
}
