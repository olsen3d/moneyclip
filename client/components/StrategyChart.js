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

  const width = 400
  const height = 200
  const radius = Math.min(width, height) / 2

  const color = d3.scaleOrdinal(['#193b42', '#086E6C', '#4C9F66', '#B8EEA1'])

  const pie = d3
    .pie()
    .value(d => d.balance)
    .sort(null)

  const arc = d3
    .arc()
    .innerRadius(radius * 0.8)
    .outerRadius(radius * 0.4)

  const chart = d3
    .select(d3Container.current)
    .append('svg')
    .attr('width', 800)
    .attr('height', 300)
    .append('g')
    .attr(
      'transform',
      'translate(' + (width / 2 + 100) + ',' + (height / 2 + 25) + ')'
    )

  let path = chart
    .selectAll('path')
    .data(pie(strategies.conservative))
    .enter()
    .append('path')
    .attr('fill', function(d, i) {
      return color(i)
    })
    .attr('d', arc)
    .each(function(d) {
      this._current = d
    }) // store the initial angles

  function redraw(data) {
    pie.value(function(d) {
      return d[data]
    }) // change the value function
    path = path.data(pie) // compute the new angles
    path
      .transition()
      .duration(750)
      .attrTween('d', arcTween) // redraw the arcs
  }

  function arcTween(a) {
    var i = d3.interpolate(this._current, a)
    this._current = i(0)
    return function(t) {
      return arc(i(t))
    }
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
