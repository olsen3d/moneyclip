/* eslint-disable react/no-this-in-sfc */
/* eslint-disable complexity */
import React, {useState, useRef, useEffect} from 'react'
import * as d3 from 'd3'
import StrategyDataDisplay from './StrategyDataDisplay'
import {strategies} from '../../script/utils'

const TTime = 300

export default function StrategyChart({strategy}) {
  const d3Container = useRef(null)
  const [selectedStock, setSelectedStock] = useState(null)

  useEffect(
    () => {
      d3
        .select(d3Container.current)
        .selectAll('*')
        .remove()
      showData(strategies[strategy])
    },
    [strategy]
  )

  const showTooltip = data => {
    data ? setSelectedStock(data.name) : setSelectedStock(null)
  }

  function showData(data) {
    const chart = d3
      .select(d3Container.current)
      .append('svg')
      .attr('id', 'chart')
      .attr('width', 500)
      .attr('height', 280)
      .append('g')

    chart.append('g').attr('class', 'slices')
    chart.append('g').attr('class', 'labels')
    chart.append('g').attr('class', 'lines')

    const width = 380
    const height = 240
    const radius = Math.min(width, height) / 2
    const color = d3.scaleOrdinal(['#193b42', '#086E6C', '#4C9F66', '#B8EEA1'])

    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.value)

    const bigPie = d3
      .pie()
      .sort(null)
      .value(d => d.value)

    const arc = d3
      .arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.4)

    const bigArc = d3
      .arc()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.35)

    const lineArc = d3
      .arc()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.8)

    const outerArc = d3
      .arc()
      .outerRadius(radius * 1)
      .innerRadius(radius * 1)

    chart.attr(
      'transform',
      'translate(' + (width / 2 + 100) + ',' + (height / 2 + 25) + ')'
    )

    chart
      .selectAll('path')
      .data(bigPie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'arc')
      .attr('fill', (d, i) => color(i))
      .on('mouseenter', function() {
        const current = this
        const others = chart.selectAll('.arc').filter(function() {
          return this !== current
        })
        others
          .transition()
          .duration(TTime)
          .attr('d', arc)
          .attr('opacity', 0.3)
        d3
          .select(this)
          .transition()
          .duration(TTime)
          .attr('d', bigArc)
          .attr('opacity', 1)
        d3
          .selectAll('polyline')
          .transition()
          .duration(TTime)
          .attr('stroke-opacity', 0.2)
        d3
          .selectAll('text')
          .transition()
          .duration(TTime)
          .attr('opacity', 0.2)
      })
      .on('mousemove', function(event, dataPoint) {
        showTooltip(dataPoint.data)
      })
      .on('mouseleave', function(d) {
        const current = this
        const others = d3.selectAll('.arc').filter(function() {
          return this !== current
        })
        others
          .transition()
          .duration(TTime)
          .attr('d', arc)
          .attr('opacity', 1)
        d3
          .select(this)
          .transition()
          .duration(TTime)
          .attr('d', arc)
          .attr('opacity', 1)
        d3
          .selectAll('polyline')
          .transition()
          .duration(TTime)
          .attr('stroke-opacity', 1)
        d3
          .selectAll('text')
          .transition()
          .duration(TTime)
          .attr('opacity', 1)

        showTooltip(null)
      })

    chart.append('g').classed('labels', true)
    chart.append('g').classed('lines', true)

    const polyline = chart
      .select('.lines')
      .selectAll('polyline')
      .data(pie(data))
      .enter()
      .append('polyline')
      .attr('points', function(d) {
        const pos = outerArc.centroid(d)
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
        return [lineArc.centroid(d), outerArc.centroid(d), pos]
      })

    const label = chart
      .select('.labels')
      .selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('dy', '.35em')
      .html(function(d) {
        return `${d.data.name} ${d.data.value}%`
      })
      .attr('transform', function(d) {
        const pos = outerArc.centroid(d)
        pos[0] = radius * 1 * (midAngle(d) < Math.PI ? 1 : -1)
        return `translate(${pos[0]},${pos[1]})`
      })
      .style('text-anchor', function(d) {
        return midAngle(d) < Math.PI ? 'start' : 'end'
      })

    function midAngle(d) {
      return d.startAngle + (d.endAngle - d.startAngle) / 2
    }
  }

  return (
    <div className="cardDouble">
      <div className="cardTwoThirds">
        <div className="homeChart" ref={d3Container} />
      </div>
      <div className="cardOneThirds">
        <StrategyDataDisplay
          data={strategies[strategy]}
          strategy={strategy}
          stock={selectedStock}
        />
      </div>
    </div>
  )
}
