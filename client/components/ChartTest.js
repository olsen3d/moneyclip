/* eslint-disable complexity */
import React, {useRef, useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import * as d3 from 'd3'
import AccountDataDisplay from './accountDataDisplay'

const TTime = 300

export default function ChartTest() {
  const accounts = useSelector(state =>
    state.accounts.filter(acc => acc.balance !== 0)
  )
  const [currentAccount, setCurrentAccount] = useState(accounts[0])
  const d3Container = useRef(null)

  useEffect(
    () => {
      if (accounts.length && d3.select('#chart').empty()) {
        showData(accounts)
      }
    },
    [accounts]
  )

  function showTooltip(data) {
    setCurrentAccount(data)
  }

  function showData(data) {
    const chart = d3
      .select(d3Container.current)
      .append('svg')
      .attr('id', 'chart')
      .attr('width', 500)
      .attr('height', 260)
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
      // .padAngle(0.025)
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
      'translate(' + (width / 2 + 20) + ',' + (height / 2 + 5) + ')'
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

        d3.select('#tooltip').style('display', 'none')

        showTooltip(accounts)
      })
      .on('click', function(event, dataPoint) {
        console.log(dataPoint.data.id)
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
    <div className="homeChartContainer">
      <div className="homeChart" ref={d3Container} />
      <AccountDataDisplay data={currentAccount || accounts} />
    </div>
  )
}
