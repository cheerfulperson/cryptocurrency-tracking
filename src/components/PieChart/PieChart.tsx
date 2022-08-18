import * as React from 'react'
import {
  pie,
  arc,
  scaleOrdinal,
  schemeCategory10,
  select,
  interpolate,
  DefaultArcObject,
  PieArcDatum,
} from 'd3'
import { UsersCrypto } from '../../models/user.model'

interface PieChartProps {
  data: UsersCrypto[]
  height?: number
  width?: number
  innerRadius?: number
  outerRadius?: number
}

const { useEffect, useRef } = React

function PieChart({ data: cryptoData, height: propHeight, width: propWidth, innerRadius: propInnerRadius, outerRadius: propOuterRadius }: PieChartProps) {
  const ref = useRef(null)
  const cache = useRef(cryptoData.map((el) => el.amount * +el.crypto.priceUsd))
  const height = propHeight ?? 300
  const width = propWidth ?? 400
  const innerRadius = propInnerRadius ?? 50
  const outerRadius = propOuterRadius ?? 100
  const createPie = pie()
    .value((d: object | number) => +d)
    .sort(null)
  const createArc = arc().innerRadius(innerRadius).outerRadius(outerRadius)
  const colors = scaleOrdinal(schemeCategory10)

  useEffect(() => {
    const data = createPie(cryptoData.map((el) => el.amount * +el.crypto.priceUsd))
    const prevData = createPie(cache.current)
    const group = select(ref.current)
    const groupWithData = group.selectAll('g.arc').data(data)

    groupWithData.exit().remove()

    const groupWithUpdate = groupWithData.enter().append('g').attr('class', 'arc')

    const path = groupWithUpdate.append('path').merge(groupWithData.select('path.arc'))

    const arcTween = (d: PieArcDatum<number | { valueOf(): number }>, i: number) => {
      const interpolator = interpolate(prevData[i], d)

      return (t: number) => {
        const interpolateData = interpolator(t)
        const translate: DefaultArcObject = {
          innerRadius: innerRadius,
          endAngle: interpolateData.endAngle,
          outerRadius: outerRadius,
          startAngle: interpolateData.startAngle,
          padAngle: interpolateData.padAngle,
        }
        return createArc(translate)
      }
    }

    path
      .attr('class', 'arc')
      .attr('fill', (d, i) => colors(`${i}`))
      .attr('data-arc-value', (d) => d.value)
      .transition('0.2')
      .attrTween('d', arcTween)

    const text = groupWithUpdate.append('text').merge(groupWithData.select('text'))
    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .style('fill', 'white')
      .style('font-size', 10)
      .transition('0.2')
      .attr('transform', (d) => {
        const translate: DefaultArcObject = {
          innerRadius: innerRadius,
          endAngle: d.endAngle,
          outerRadius: outerRadius,
          startAngle: d.startAngle,
          padAngle: d.padAngle,
        }
        return `translate(${createArc.centroid(translate)})`
      })
      .tween('text', (d, i: number, nodes) => {
        return () => select(nodes[i]).text(cryptoData[i].crypto.symbol)
      })
  }, [cryptoData])

  return (
    <svg width={width} height={height}>
      <g ref={ref} transform={`translate(${width / 2}, ${outerRadius + innerRadius})`} />
    </svg>
  )
}

export default PieChart
