/* eslint-disable complexity */
import React, {useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'
import * as d3 from 'd3'

export default function ChartTest() {
  const accounts = useSelector(state =>
    state.accounts.filter(acc => acc.balance !== 0)
  )
  const d3Container = useRef(null)

  useEffect(
    () => {
      if (accounts.length && d3.select('#chart').empty()) {
        showData(accounts)
      }
    },
    [accounts]
  )

  function showData(data) {
    const svg = d3
      .select(d3Container.current)
      .append('svg')
      .attr('id', 'chart')
      .attr('width', 960)
      .attr('height', 500)
      .append('g')

    svg.append('g').attr('class', 'slices')
    svg.append('g').attr('class', 'labels')
    svg.append('g').attr('class', 'lines')
    const width = 400
    const height = 300
    const radius = Math.min(width, height) / 2
    const color = d3.scaleOrdinal(['#193b42', '#086E6C', '#4C9F66', '#B8EEA1'])
    const pie = d3
      .pie()
      .sort(null)
      .value(d => d.balance)
    const bigPie = d3
      .pie()
      .padAngle(0.025)
      .sort(null)
      .value(d => d.balance)
    const arc = d3
      .arc()
      .innerRadius(radius * 0.8)
      .outerRadius(radius * 0.4)
    const bigArc = d3
      .arc()
      .innerRadius(radius * 0.85)
      .outerRadius(radius * 0.35)

    const outerArc = d3
      .arc()
      .outerRadius(radius * 1)
      .innerRadius(radius * 1)

    svg.attr(
      'transform',
      'translate(' + (width / 2 + 100) + ',' + (height / 2 + 25) + ')'
    )

    svg
      .selectAll('path')
      .data(bigPie(data))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'arc')
      .attr('fill', (d, i) => color(i))
      .on('mouseenter', function(d) {
        const current = this
        const others = svg.selectAll('.arc').filter(function() {
          return this != current
        })
        others
          .transition()
          .attr('d', arc)
          .attr('opacity', 0.3)
        d3
          .select(this)
          .transition()
          .attr('d', bigArc)
          .attr('opacity', 1)
      })
      .on('mouseleave', function(d) {
        const current = this
        const others = d3.selectAll('.arc').filter(function() {
          return this != current
        })
        others.transition().attr('opacity', 1)
        d3
          .select(this)
          .transition()
          .attr('d', arc)
      })
    svg.append('g').classed('labels', true)
    svg.append('g').classed('lines', true)

    const polyline = svg
      .select('.lines')
      .selectAll('polyline')
      .data(pie(data))
      .enter()
      .append('polyline')
      .attr('points', function(d) {
        const pos = outerArc.centroid(d)
        pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1)
        return [arc.centroid(d), outerArc.centroid(d), pos]
      })

    const label = svg
      .select('.labels')
      .selectAll('text')
      .data(pie(data))
      .enter()
      .append('text')
      .attr('dy', '.35em')
      .html(function(d) {
        return `${d.data.name}`
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
    <div>
      <div ref={d3Container} />
    </div>
  )
}
