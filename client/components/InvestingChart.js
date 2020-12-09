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

  const filterDomain = async (days = filteredData.length) => {
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

    const svg = d3.select('body')

    svg
      .select('.xAxis')
      .transition()
      .duration(1000)
      .ease(d3.easeCubicOut)
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
      .ease(d3.easeCubicOut)
      .call(d3.axisRight(mainY))

    await svg
      .select('.line')
      .transition()
      .duration(50)
      .attr('stroke-opacity', 0)
      .end()

    svg
      .select('.areaLine')
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr('d', areaLine)

    svg
      .select('.netLine')
      .transition()
      .duration(750)
      .ease(d3.easeCubicOut)
      .attr('d', netLine)

    await svg
      .select('.line')
      .transition()
      .duration(500)
      .attr('d', mainLine(filter))
      .attr('stroke-opacity', 0)
      .end()

    svg
      .select('.line')
      .transition()
      .duration(250)
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
      .attr('class', 'areaLine')
      .datum(transactions)
      .attr('d', areaLine)
      .style('fill', '#4C9F66')
      .attr('opacity', 0.4)

    mainChart
      .append('path')
      .attr('class', 'netLine')
      .datum(transactions)
      .attr('d', netLine)
      .style('fill', '#000000')
      .attr('opacity', 0.15)

    mainChart
      .append('rect')
      .attr('height', mainHeight + 50)
      .attr('width', 30)
      .attr('transform', 'translate(-30, 0)')
      .style('fill', 'white')

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

    const gradient = mainChart
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
          <span className="lightFont">filter here</span>
          <div className="spacer" />
          <button type="button" onClick={() => filterDomain(66)}>
            3 months
          </button>
          <button type="button" onClick={() => filterDomain(160)}>
            6 months
          </button>
          <button type="button" onClick={() => filterDomain(261)}>
            1 year
          </button>
          <button type="button" onClick={() => filterDomain(261 * 2)}>
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
