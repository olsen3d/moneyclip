/* eslint-disable complexity */
import React, {useRef, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import * as d3 from 'd3'
import AccountPreview from './AccountPreview'

export default function ChartTest() {
  const accounts = useSelector(state =>
    state.accounts.filter(acc => acc.balance !== 0)
  )
  const d3Container = useRef(null)
  const [currentAccount, setCurrentAccount] = useState(accounts[0])

  //only create the chart once
  useEffect(
    () => {
      if (accounts.length && d3.select('#chart').empty()) {
        showData(accounts)
      }
    },
    [accounts]
  )

  //mouse over tooltip function
  function showTooltip(data, coords) {
    // setCurrentAccount(data)
    // d3
    //   .select('#tooltip')
    //   .style('top', `${coords[1] + 2}px`)
    //   .style('left', `${coords[0] + 2}px`)
    //   .style('display', 'block')
  }

  function showData(data) {
    //create the main chart
    const chart = d3
      .select(d3Container.current)
      .append('svg')
      .attr('id', 'chart')
      .attr('width', 800)
      .attr('height', 300)
      .append('g')

    //append classes to the chart
    chart.append('g').attr('class', 'slices')
    chart.append('g').attr('class', 'labels')
    chart.append('g').attr('class', 'lines')

    const width = 400
    const height = 200
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

    chart.attr(
      'transform',
      'translate(' + (width / 2 + 40) + ',' + (height / 2 + 25) + ')'
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
          .attr('d', arc)
          .attr('opacity', 0.3)
        d3
          .select(this)
          .transition(100)
          .attr('d', bigArc)
          .attr('opacity', 1)
      })
      .on('mousemove', function(event, dataPoint) {
        showTooltip(dataPoint.data, [event.clientX, event.clientY])
      })
      .on('mouseleave', function(d) {
        const current = this
        const others = d3.selectAll('.arc').filter(function() {
          return this !== current
        })
        others
          .transition()
          .attr('d', arc)
          .attr('opacity', 1)
        d3
          .select(this)
          .transition()
          .attr('d', arc)
          .attr('opacity', 1)
        d3.select('#tooltip').style('display', 'none')
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
        return [arc.centroid(d), outerArc.centroid(d), pos]
      })

    const label = chart
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
      <div id="tooltip">
        {currentAccount ? <AccountPreview account={currentAccount} /> : null}
      </div>
      <div ref={d3Container} />
    </div>
  )
}
