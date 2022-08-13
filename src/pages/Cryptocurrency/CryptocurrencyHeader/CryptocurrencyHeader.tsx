import * as React from 'react'
import { CryptoAssets } from '../../../models/crypto.model'

interface CryptocurrencyHeaderProps{
    cryptoInfo: CryptoAssets
}

function CryptocurrencyHeader({cryptoInfo}: CryptocurrencyHeaderProps) {

  return (
    <article className='cryptocurrency-header'>
      <h2 className='cryptocurrency-header__name'>
        <span>{cryptoInfo.name}</span>/<span>{cryptoInfo.symbol}</span>
      </h2>
      <p className=''>
        <span>Last price:</span>
        <span>{cryptoInfo.priceUsd}</span>
      </p>
      <p className=''>
        <span>Daily change:</span>
        <span>{cryptoInfo.changePercent24Hr}</span>
      </p>
      <p className=''>
        <span>Today`s open:</span>
        <span>{cryptoInfo.vwap24Hr}</span>
      </p>
      <p className=''>
        <span>24h volume:</span>
        <span>{cryptoInfo.volumeUsd24Hr}</span>
      </p>
    </article>
  )
}

export default CryptocurrencyHeader
