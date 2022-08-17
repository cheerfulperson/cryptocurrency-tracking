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
  function onMouseOver(
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    price: string,
    date: string | number,
  ) {
    const selectedIem = select('.chart__bar-price')
    const parentNode = toolkitRef.current.parentNode as HTMLElement
    const { x: parentX, y: parentY } = parentNode.getBoundingClientRect()
    let x = e.clientX - parentX + 5
    const y = e.clientY - parentY + 5
    if (x > window.innerWidth - toolkitRef.current.clientWidth * 2) {
      x = x - toolkitRef.current.clientWidth
    }
    toolkitRef.current.style.cssText = `left:${x}px;top:${y}px;transform: scale(1)`
    selectedIem.data(price).text(`Price: ${price}$`).append('br')
    selectedIem.append('span').text(`Date: ${date}`)
  }

  function onMouseLeave() {
    toolkitRef.current.style.transform = 'scale(0)'
  }

  return (
    <>
      {data.map(({ priceUsd, time }, i) => {
        const prePrice = data[i - 1] ? data[i - 1].priceUsd : 0
        return (
          <rect
            key={`bar-${priceUsd}`}
            x={scaleX(`${time}`)}
            y={scaleY(+priceUsd) - 1}
            width={scaleX.bandwidth()}
            height={height - scaleY(+priceUsd)}
            className='bar-chart__rect'
            onMouseOver={(e) => onMouseOver(e, priceUsd, time)}
            onMouseLeave={() => onMouseLeave()}
            fill={priceUsd < prePrice ? '#ff0000' : '#00e500'}
          />
        )
      })}
    </>
  )
}
