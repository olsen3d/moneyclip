/* eslint-disable complexity */
import React, {useRef, useState, useEffect} from 'react'
import * as d3 from 'd3'

export default function InvestingChart({accountData}) {
  const d3MainContainer = useRef(null)
  const [filteredData, setFilteredData] = useState(accountData)

  useEffect(
    () => {
      setFilteredData(accountData)
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
  let mainWidth = 450

  let mainX = d3.scaleTime().range([0, mainWidth])

  let mainY = d3.scaleLinear().range([mainHeight, 0])

  let mainLine = d3
    .line()
    .curve(d3.curveLinear)
    .x(d => mainX(d.date))
    .y(d => mainY(+d.balance * 0.01))

  const filterDomain = async (days = filteredData.length) => {
    console.log('filtering')
    const filter = filteredData
      .map(trans => {
        return {
          date: new Date(trans.date),
          balance: trans.balance * 1,
          net: trans.net * 1
        }
      })
      .filter((val, i) => i < days)

    let minValue = Math.min(
      d3.min(filter, d => +d.balance * 0.01),
      d3.min(filter, d => +d.net * 0.01)
    )
    let maxValue = d3.max(filter, d => +d.balance * 0.01)

    mainX.domain(d3.extent(filter, d => d.date))
    mainY.domain([minValue, maxValue])

    const svg = d3.select('body').transition()

    svg
      .select('.xAxis')
      .duration(750)
      .call(d3.axisBottom(mainX).tickFormat(d3.timeFormat('%b %d %y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)')

    svg
      .select('.yAxis')
      .duration(750)
      .call(d3.axisLeft(mainY))

    await svg
      .select('.line')
      .duration(150)
      .attr('stroke-opacity', 0)
      .end()

    await svg
      .select('.line')
      .duration(50)
      .attr('d', mainLine(filter))
      .attr('stroke-opacity', 0)
      .end()

    await svg
      .select('.line')
      .duration(750)
      .attr('stroke-opacity', 0.7)
      .end()
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

    mainChart
      .append('g')
      .attr('class', 'yAxis')
      .call(d3.axisLeft(mainY))

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

    mainChart
      .append('path')
      .attr('class', 'line')
      .datum(transactions)
      .transition()
      .duration(750)
      .attr('d', mainLine)
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
        <div className="cardOneThirds">
          <button type="button" onClick={() => filterDomain(90)}>
            3 months
          </button>
          <button type="button" onClick={() => filterDomain(365)}>
            1 year
          </button>
          <button type="button" onClick={() => filterDomain(365 * 2)}>
            2 years
          </button>
          <button type="button" onClick={() => filterDomain()}>
            All
          </button>
        </div>
      </div>
    </React.Fragment>
  )
}
