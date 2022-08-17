import * as React from 'react'
import { axisLeft, ScaleLinear } from 'd3'
import { select } from 'd3-selection'
import './AxisLeft.scss'

const { useRef, useEffect } = React

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>
  }

export default function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null)

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale)).style('user-select', 'none')
    }
  }, [scale])

  return <g ref={ref} className='y-axis' />
}
