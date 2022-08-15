import * as React from 'react'
import { CryptoAssets } from '../../../models/crypto.models'
import { getToFixedPrice } from '../../../utils/cummon'
import './CryptoInfo.scss'

interface CryptoInfoProps {
  info: CryptoAssets
}

function CryptoInfo({ info }: CryptoInfoProps) {
  const profitSign = info.changePercent24Hr > 0 ? '+' : ''
  const profitColor = info.changePercent24Hr > 0 ? '#19e219' : '#ff0000'
  return (
    <p className='crypto-info'>
      <span className='crypto-info__code'>{info.symbol}</span>
      <span className='crypto-info__price'>{` $${getToFixedPrice(info.priceUsd)}`}</span>
      <span className='crypto-info__profit' style={{ color: profitColor }}>
        {` ${profitSign}${getToFixedPrice(info.changePercent24Hr)}`}%
      </span>
    </p>
  )
}

export default CryptoInfo
