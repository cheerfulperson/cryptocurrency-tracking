import * as React from 'react'
import { scaleBand, scaleLinear } from 'd3'
import { selectAll } from 'd3-selection'
import { CryptoHistory } from '../../models/crypto.models'
import Bars from './Bars/Bars'
import AxisBottom from './AxisBottom/AxisBottom'
import './BarChart.scss'
import AxisLeft from './AxisLeft/AxisLeft'

const { useRef, useEffect, useState } = React

interface BarChartProps {
  data: CryptoHistory[]
}

interface MouseState {
  mouseDownX: number
  mouseUpX: number
}

export function BarChart({ data }: BarChartProps) {
  const rectAmount = 20
  const [chartSize, setChartSize] = useState<number>(getChartSize())
  const [scrollPosition, setScrollPosition] = useState<number>(data.length)
  const [cryptoHistory, setCryptoHistory] = useState(
    data.slice(scrollPosition - rectAmount, scrollPosition),
  )
  const margin = { top: 10, right: 20, bottom: 60, left: 60 }
  const width = chartSize - margin.left - margin.right
  const height = 400 - margin.top - margin.bottom
  const maxPrice = Math.max(...cryptoHistory.map(({ priceUsd }) => +priceUsd))
  const chart = useRef<SVGGElement>()
  const chartToolkit = useRef<HTMLDivElement>()
  const scaleX = scaleBand()
    .domain(cryptoHistory.map(({ time }) => time))
    .range([0, width])
    .padding(0.1)
  const scaleY = scaleLinear()
    .domain([0, maxPrice + maxPrice / 10])
    .range([height, 0])
  const mouseState: MouseState = {
    mouseDownX: 0,
    mouseUpX: 0,
  }

  useEffect(() => {
    selectAll('g.tick')
      .append('line')
      .classed('bar-chart__grid-line', true)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', width)
      .attr('y2', 0)

    selectAll('g.x-axis text')
      .classed('bar-chart__text', true)
      .style('transform', 'rotate(-90deg) translate(-30px, -10px)')
  }, [cryptoHistory])

  useEffect(() => {
    function resize() {
      setChartSize(getChartSize())
    }
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [chartSize])

  function getChartSize() {
    const winWidth = window.innerWidth
    if (winWidth > 1024) {
      return 950
    }
    return winWidth
  }

  function handleTouchDown(e: React.TouchEvent<HTMLDivElement>) {
    if (e.touches[0]) {
      mouseState.mouseDownX = e.touches[0].clientX - chart.current.clientLeft
    }
  }

  function handleTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    if (e.changedTouches[0]) {
      mouseState.mouseUpX = e.changedTouches[0].clientX - chart.current.clientLeft
      setDataAfterScroll()
    }
  }

  function handleClickDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    mouseState.mouseDownX = e.clientX - chart.current.clientLeft
  }

  function handleClickEnd(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    mouseState.mouseUpX = e.clientX - chart.current.clientLeft
    setDataAfterScroll()
  }

  function setDataAfterScroll() {
    const newElementsAmount = Math.round(
      ((mouseState.mouseDownX - mouseState.mouseUpX) / width) * rectAmount,
    )
    const newScrollPosition = scrollPosition + newElementsAmount
    if (data[newScrollPosition - 1] && newScrollPosition >= 0) {
      setScrollPosition(newScrollPosition)
      setCryptoHistory(data.slice(newScrollPosition - rectAmount, newScrollPosition))
    }
  }

  return (
    <div
      className='chart'
      onMouseDown={(e) => handleClickDown(e)}
      onMouseUp={(e) => handleClickEnd(e)}
      onTouchStart={(e) => handleTouchDown(e)}
      onTouchEnd={(e) => handleTouchEnd(e)}
    >
      <div className='chart__label' ref={chartToolkit}>
        <p className='chart__bar-price'></p>
      </div>
      <svg
        className='bar-chart'
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g ref={chart} transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
          <AxisLeft scale={scaleY} />
          <Bars
            data={cryptoHistory}
            toolkitRef={chartToolkit}
            height={height}
            scaleX={scaleX}
            scaleY={scaleY}
          />
        </g>
      </svg>
    </div>
  )
}
