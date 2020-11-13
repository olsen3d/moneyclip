/* eslint-disable complexity */
import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3'

const strategies = {
  conservative: [
    {name: 'AGG', value: 25},
    {name: 'VTI', value: 30},
    {name: 'VEA', value: 40},
    {name: 'VWO', value: 5}
  ],
  balanced: [
    {name: 'AGG', value: 10},
    {name: 'VTI', value: 40},
    {name: 'VEA', value: 30},
    {name: 'VWO', value: 20}
  ],
  aggressive: [
    {name: 'AGG', value: 5},
    {name: 'VTI', value: 20},
    {name: 'VEA', value: 30},
    {name: 'VWO', value: 45}
  ]
}

export default function StrategyChart() {
  const [strategy, setStrategy] = useState('conservative')
  const d3Container = useRef(null)

  //create the main chart
  const chart = d3
    .select(d3Container.current)
    .append('svg')
    .attr('id', 'chart')
    .attr('width', 800)
    .attr('height', 300)
    .append('g')

  const color = d3.scaleOrdinal(['#193b42', '#086E6C', '#4C9F66', '#B8EEA1'])

  //append classes to the chart
  chart.append('g').attr('class', 'slices')
  chart.append('g').attr('class', 'labels')
  chart.append('g').attr('class', 'lines')

  const width = 400
  const height = 200
  const radius = Math.min(width, height) / 2

  const pie = d3
    .pie()
    .padAngle(0.025)
    .sort(null)
    .value(d => d.value)

  const arc = d3
    .arc()
    .innerRadius(radius * 0.8)
    .outerRadius(radius * 0.4)

  const outerArc = d3
    .arc()
    .outerRadius(radius * 1)
    .innerRadius(radius * 1)

  chart.attr(
    'transform',
    'translate(' + (width / 2 + 100) + ',' + (height / 2 + 25) + ')'
  )

  chart.append('g').classed('labels', true)
  chart.append('g').classed('lines', true)

  redraw(strategies.conservative)

  function redraw(data) {
    console.log('redraw', data)
    chart
      .selectAll('path')
      .data(pie(data), function(d) {
        return d.data.name
      })
      .transition()
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'arc')
      .attr('fill', (d, i) => color(i))
  }

  // const polyline = chart
  //   .select('.lines')
  //   .selectAll('polyline')
  //   .data(pie(data))
  //   .enter()
  //   .append('polyline')
  //   .attr('points', function(d) {
  //     const pos = outerArc.centroid(d)
  //     pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
  //     return [arc.centroid(d), outerArc.centroid(d), pos]
  //   })

  // const label = chart
  //   .select('.labels')
  //   .selectAll('text')
  //   .data(pie(data))
  //   .enter()
  //   .append('text')
  //   .attr('dy', '.35em')
  //   .html(function(d) {
  //     return `${d.data.name}`
  //   })
  //   .attr('transform', function(d) {
  //     const pos = outerArc.centroid(d)
  //     pos[0] = radius * 1 * (midAngle(d) < Math.PI ? 1 : -1)
  //     return `translate(${pos[0]},${pos[1]})`
  //   })
  //   .style('text-anchor', function(d) {
  //     return midAngle(d) < Math.PI ? 'start' : 'end'
  //   })

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2
  }

  return (
    <div className="">
      <svg style={{height: '500', width: '750'}}>
        <g ref={d3Container} style={{transform: 'translate(150px, 150px)'}} />
      </svg>
      <select
        value={strategy}
        onChange={e => {
          setStrategy(e.target.value)
          redraw(strategies[e.target.value])
        }}
      >
        <option value="conservative">conservative</option>
        <option value="balanced">balanced</option>
        <option value="aggressive">aggressive</option>
      </select>
    </div>
  )
}
