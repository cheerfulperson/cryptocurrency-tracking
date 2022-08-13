import * as React from 'react'
import { HeaderCryptoInfo } from '../../../models/crypto-info.model'
import './CryptoInfo.scss'

interface CryptoInfoProps {
  info: HeaderCryptoInfo
}

function CryptoInfo({ info }: CryptoInfoProps) {
  const profitSign = info.profit > 0 ? '+' : ''
  const profitColor = info.profit > 0 ? '#19e219' : '#ff0000'
  return (
    <p className='crypto-info'>
      <span className='crypto-info__code'>{info.cryptoCode}</span>
      <span className='crypto-info__price'>{` ${info.currency}${info.price}`}</span>
      <span className='crypto-info__profit' style={{ color: profitColor }}>
        {` ${profitSign}${info.profit}`}%
      </span>
    </p>
  )
}

export default CryptoInfo
