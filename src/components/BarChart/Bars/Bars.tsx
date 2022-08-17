import * as React from 'react'
import { select } from 'd3-selection'
import { ScaleBand, ScaleLinear } from 'd3'
import { CryptoHistory } from '../../../models/crypto.models'
import './Bars.scss'

interface BarsProps {
  data: CryptoHistory[]
  height: number
  scaleX: ScaleBand<string>
  scaleY: ScaleLinear<number, number, never>
  toolkitRef: React.MutableRefObject<HTMLDivElement>
}

export default function Bars({ data, height, scaleX, scaleY, toolkitRef }: BarsProps) {
  function onMouseOver(e: React.MouseEvent<SVGRectElement, MouseEvent>, price: string) {
    const parentNode = toolkitRef.current.parentNode as HTMLElement
    const { x: parentX, y: parentY } = parentNode.getBoundingClientRect()
    let x = e.clientX - parentX
    const y = e.clientY - parentY
    if (x > window.innerWidth - toolkitRef.current.clientWidth * 2) {
      x = x - toolkitRef.current.clientWidth
    }
    toolkitRef.current.style.cssText = `left:${x}px;top:${y}px;opacity:1`
    select('.chart__bar-price').data(price).text(`Price: ${price}$`)
  }

  function onMouseLeave() {
    toolkitRef.current.style.opacity = '0'
  }

  return (
    <>
      {data.map(({ priceUsd, time }, i) => {
        const prePrice = data[i - 1] ? data[i - 1].priceUsd : 0
        return (
          <rect
            key={`bar-${priceUsd}`}
            x={scaleX(time)}
            y={scaleY(priceUsd) - 1}
            width={scaleX.bandwidth()}
            height={height - scaleY(priceUsd)}
            className='bar-chart__rect'
            onMouseOver={(e) => onMouseOver(e, priceUsd)}
            onMouseLeave={() => onMouseLeave()}
            fill={priceUsd < prePrice ? '#ff0000' : '#00e500'}
          />
        )
      })}
    </>
  )
}
