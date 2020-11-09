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

  useEffect(() => {
    showData(strategies.conservative)
  }, [])

  function showData(data) {
    const bodyHeight = 200
    const radius = bodyHeight / 2

    const pie = d3.pie().value(d => d.value)
    let extent = d3.extent(data, d => d.value)
    const colors = [
      '#192529',
      '#223537',
      '#2B4645',
      '#345752',
      '#3F695E',
      '#4C7B68',
      '#5B8E70',
      '#6EA178',
      '#83B37E',
      '#9BC583',
      '#B6D787'
    ]

    const colorScale = d3
      .scaleOrdinal()
      .range(['#dd983e', '#2B4645', '#5B8E70', '#6EA178', '#83B37E', '#9BC583'])
      .domain(data.map(d => d.name))

    const arc = d3
      .arc()
      .outerRadius(bodyHeight / 2)
      .innerRadius(40)

    change(pie, arc, colorScale, data)
  }

  function change(pie, arc, colorScale, data) {
    console.log('change')
    let g = d3
      .select(d3Container.current)
      .selectAll('.arc')
      .data(pie(data))

    g.enter().append('g')
    g
      .append('path')
      .attr('d', arc)
      .attr('fill', d => colorScale(d.data.name))
      .transition()
  }

  return (
    <div className="">
      <svg style={{height: '300', width: '350'}}>
        <g ref={d3Container} style={{transform: 'translate(150px, 150px)'}} />
      </svg>
      <select
        value={strategy}
        onChange={e => {
          setStrategy(e.target.value)
          showData(strategies[e.target.value])
        }}
      >
        <option value="conservative">conservative</option>
        <option value="balanced">balanced</option>
        <option value="aggressive">aggressive</option>
      </select>
    </div>
  )
}
