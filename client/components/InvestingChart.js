/* eslint-disable complexity */
import React, {useRef, useState, useEffect} from 'react'
import * as d3 from 'd3'

export default function InvestingChart({accountData}) {
  const d3MainContainer = useRef(null)
  const [filteredData, setFilteredData] = useState()

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

  let areaLine = d3.area().curve(d3.curveLinear)
  let netLine = d3.area().curve(d3.curveStepAfter)

  const filterDomain = filter => {
    let minValue = Math.min(
      d3.min(filter, d => +d.balance * 0.01),
      d3.min(filter, d => +d.net * 0.01)
    )
    let maxValue = d3.max(filter, d => +d.balance * 0.01)

    mainX.domain(d3.extent(filter, d => d.date))
    mainY.domain([minValue, maxValue])

    const svg = d3.select('body')
    const easeMethod = d3.easeExp

    svg
      .select('.xAxis')
      .transition()
      .duration(1000)
      .ease(easeMethod)
      .call(d3.axisBottom(mainX).tickFormat(d3.timeFormat('%b %d %y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')

    svg
      .select('.yAxis')
      .transition()
      .duration(1000)
      .ease(easeMethod)
      .call(d3.axisRight(mainY))

    svg
      .select('.areaLine')
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('d', areaLine)

    svg
      .select('.netLine')
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('d', netLine)

    svg
      .select('.netLineBehind')
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('d', netLine)

    svg
      .select('.line')
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('d', mainLine)
      .attr('stroke-opacity', 0.9)
  }

  function showData(transactions) {
    transactions = transactions.map(trans => {
      return {
        date: new Date(trans.date),
        balance: trans.balance * 1,
        net: trans.net * 1
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

    areaLine
      .x(d => mainX(d.date))
      .y0(mainY(minValue))
      .y1(d => mainY(+d.balance * 0.01))

    netLine
      .x(d => mainX(d.date))
      .y0(mainY(minValue))
      .y1(d => mainY(+d.net * 0.01))

    mainChart
      .append('path')
      .attr('class', 'netLineBehind')
      .datum(transactions)
      .attr('d', netLine)
      .style('fill', '#fff9e4')
      .attr('opacity', 1)

    mainChart
      .append('path')
      .attr('class', 'areaLine')
      .datum(transactions)
      .attr('d', areaLine)
      .style('fill', '#D8EBE1')
      .attr('opacity', 1)

    mainChart
      .append('path')
      .attr('class', 'netLine')
      .datum(transactions)
      .attr('d', netLine)
      .style('fill', '#161d2b')
      .attr('opacity', 0.33)
      .style('mix-blend-mode', 'color-burn')

    mainChart
      .append('path')
      .attr('class', 'line')
      .datum(transactions)
      .transition()
      .duration(750)
      .attr('d', mainLine)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.9)
      .style('fill', 'none')

    mainChart
      .append('rect')
      .attr('height', mainHeight + 50)
      .attr('width', 30)
      .attr('transform', 'translate(-30, 0)')
      .style('fill', 'white')

    mainChart
      .append('rect')
      .attr('height', 50)
      .attr('width', mainWidth)
      .attr('transform', `translate(-30, ${mainHeight})`)
      .style('fill', 'white')

    mainChart
      .append('line')
      .attr('x1', 10)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', 10)
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 3)
      .attr('stroke-opacity', 0.9)
      .style('fill', 'none')

    mainChart
      .append('text')
      .attr('x', 20)
      .attr('y', 10)
      .text('Balance')

    mainChart
      .append('circle')
      .attr('r', 5)
      .attr('cx', 2)
      .attr('cy', 30)
      .style('fill', '#d9ebe1')

    mainChart
      .append('text')
      .attr('x', 20)
      .attr('y', 35)
      .text('Gains')

    mainChart
      .append('circle')
      .attr('r', 5)
      .attr('cx', 2)
      .attr('cy', 50)
      .style('fill', '#ffeab8')

    mainChart
      .append('text')
      .attr('x', 20)
      .attr('y', 55)
      .text('Losses')

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

  const applyFilter = (days = accountData.length) => {
    const filter = accountData
      .map(trans => {
        return {
          date: new Date(trans.date),
          balance: trans.balance * 1,
          net: trans.net * 1
        }
      })
      .filter((val, i) => i < days)
    filterDomain(filter)
  }

  return (
    <React.Fragment>
      <div className="cardDouble">
        <div className="cardTwoThirds">
          <svg id="container" height="350" width="600">
            <g ref={d3MainContainer} transform="translate(30,5)" />
          </svg>
        </div>
        <div className="cardOneThirds">
          <div>
            <span className="regularFont font16 header">Balance</span>
          </div>
          <div className="spacer" />
          <span className="lightFont">Select a date range:</span>
          <div className="spacer" />
          <div className="buttonHolder">
            <button
              type="button"
              className="whiteButton lightFont"
              onClick={() => applyFilter(66)}
            >
              3 months
            </button>
            <button
              type="button"
              className="whiteButton lightFont"
              onClick={() => applyFilter(160)}
            >
              6 months
            </button>
            <button
              type="button"
              className="whiteButton lightFont"
              onClick={() => applyFilter(261)}
            >
              1 year
            </button>
            <button
              type="button"
              className="whiteButton lightFont"
              onClick={() => applyFilter(261 * 2)}
            >
              2 years
            </button>
            <button
              type="button"
              className="whiteButton lightFont"
              onClick={() => applyFilter()}
            >
              All
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
