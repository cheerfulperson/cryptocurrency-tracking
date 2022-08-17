import * as React from 'react'
import { axisBottom, ScaleBand } from 'd3'
import { select } from 'd3-selection'
import './AxisBottom.scss'

const {useEffect} = React;

interface AxisBottomProps {
    scale: ScaleBand<string>
    transform: string
  }

export default function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = React.useRef<SVGGElement>(null)

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale)).style('user-select', 'none')
    }
  }, [scale])

  return <g ref={ref} className='x-axis' transform={transform} />
}
