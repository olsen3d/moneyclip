/* eslint-disable complexity */
import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'
import * as d3 from 'd3'

export default function ChartTest() {
  const accounts = useSelector(state => state.accounts)
  const d3Container = useRef(null)

  useEffect(
    () => {
      console.log('render')
      showData(accounts)
    },
    [accounts]
  )

  function showData(data) {
    const bodyHeight = 200
    const radius = bodyHeight / 2

    const pie = d3.pie().value(d => d.balance)

    const colorScale = d3
      .scaleOrdinal()
      .range(d3.schemeCategory10)
      .domain(data.map(d => d.name))

    const arc = d3
      .arc()
      .outerRadius(bodyHeight / 2)
      .innerRadius(40)

    let g = d3
      .select(d3Container.current)
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
    g
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.name))

    g
      .append('text')
      .attr('transform', function(d) {
        return (
          'translate(' +
          (radius - 12) *
            Math.sin((d.endAngle - d.startAngle) / 2 + d.startAngle) +
          ',' +
          -1 *
            (radius - 12) *
            Math.cos((d.endAngle - d.startAngle) / 2 + d.startAngle) +
          ')'
        )
      })
      .attr('dy', '.35em')
      .style('text-anchor', function(d) {
        var rads = (d.endAngle - d.startAngle) / 2 + d.startAngle
        if (
          (rads > 7 * Math.PI / 4 && rads < Math.PI / 4) ||
          (rads > 3 * Math.PI / 4 && rads < 5 * Math.PI / 4)
        ) {
          return 'middle'
        } else if (rads >= Math.PI / 4 && rads <= 3 * Math.PI / 4) {
          return 'start'
        } else if (rads >= 5 * Math.PI / 4 && rads <= 7 * Math.PI / 4) {
          return 'end'
        } else {
          return 'middle'
        }
      })
      .text(function(d) {
        return d.data.name
      })
  }

  return (
    <div>
      <h3>ChartTest</h3>
      <svg style={{height: '300', width: '500'}}>
        <g ref={d3Container} style={{transform: 'translate(150px, 150px)'}} />
      </svg>
    </div>
  )
}
