import React, {useRef, useState, useEffect} from 'react'
import * as d3 from 'd3'

function StockChart({stock}) {
  const d3MainContainer = useRef(null)

  useEffect(
    () => {
      d3
        .select(d3MainContainer.current)
        .selectAll('*')
        .remove()
      const processedData = []
      stock.history.t.forEach((t, i) => {
        processedData.push({
          date: new Date(t * 1000),
          amount: stock.history.c[i]
        })
      })
      showData(processedData)
    },
    [stock]
  )

  function showData(processedData) {
    let mainChart

    let mainHeight = 170
    let mainWidth = 770

    let mainX = d3.scaleTime().range([0, mainWidth])
    let mainY = d3.scaleLinear().range([mainHeight, 0])

    let minValue = d3.min(processedData, d => +d.amount)
    let maxValue = d3.max(processedData, d => +d.amount)

    const easeMethod = d3.easeExp

    let flatLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => mainX(d.date))
      .y(mainHeight)

    let mainLine = d3
      .line()
      .curve(d3.curveLinear)
      .x(d => mainX(d.date))
      .y(d => mainY(+d.amount))

    let areaFlatLine = d3
      .area()
      .curve(d3.curveLinear)
      .x(d => mainX(d.date))
      .y0(mainHeight)
      .y1(mainHeight)

    let areaLine = d3
      .area()
      .curve(d3.curveLinear)
      .x(d => mainX(d.date))
      .y0(mainHeight)
      .y1(d => mainY(+d.amount))

    mainChart = d3.select(d3MainContainer.current)

    mainX.domain(d3.extent(processedData, d => d.date))
    mainY.domain([minValue, maxValue])

    mainChart
      .append('path')
      .attr('class', 'line')
      .attr('stroke', '#086e6c')
      .attr('stroke-width', 3)
      .attr('stroke-opacity', 0.9)
      .style('fill', 'none')
      .datum(processedData)
      .attr('d', flatLine)
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('d', mainLine)

    mainChart
      .append('path')
      .attr('class', 'areaLine')
      .datum(processedData)
      .style('fill', '#D8EBE1')
      .attr('opacity', 1)
      .attr('d', areaFlatLine)
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('d', areaLine)

    mainChart
      .append('g')
      .attr('class', 'yAxis')
      .attr('transform', `translate(-50, 0)`)
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('transform', `translate(${mainWidth}, 0)`)
      .call(d3.axisRight(mainY))

    mainChart
      .append('g')
      .attr('class', 'xAxis')
      .attr('transform', `translate(0, ${mainHeight})`)
      .call(d3.axisBottom(mainX).tickFormat(d3.timeFormat('%b %y')))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .transition()
      .duration(750)
      .ease(easeMethod)
      .attr('transform', 'rotate(-20)')

    d3
      .select(`#closing${stock.name}`)
      .text(`$${processedData[processedData.length - 1].amount.toFixed(2)}`)
  }
  return (
    <React.Fragment>
      <div className="cardFull">
        <div className="flexRow">
          <div className="stockHeader">
            <div className="regularFont largerFont">{stock.name}</div>
            <div id={`closing${stock.name}`} className="lightFont" />
          </div>
          <svg id="container" height="200" width="870">
            <g ref={d3MainContainer} transform="translate(0,0)" />
          </svg>
        </div>
      </div>
    </React.Fragment>
  )
}

export default StockChart
