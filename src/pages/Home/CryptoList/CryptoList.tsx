import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import List from '../../../components/List/List'
import ListItem from '../../../components/ListItem/ListItem'
import { CryptoAssets } from '../../../models/crypto.model'
import './CryptoList.scss'

interface CryptoListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  cryptoDataAssets: CryptoAssets[]
}

function CryptoList({ cryptoDataAssets, ...props }: CryptoListProps) {
  const history = useNavigate()
  const getToFixedNumber = (price: number | string) => {
    const absPrice = Math.abs(+price)
    if (absPrice > 1000) {
      return 2
    }
    if (absPrice > 1) {
      return 4
    }
    if (absPrice > 0.01) {
      return 6
    }
    return 8
  }
  const getPriceColor = (price: number | string) => {
    return +price > 0 ? '#19e219' : '#ff0000'
  }

  function goToPage(currencyId: string) {
    history(`/cryptocurrency/${currencyId}`)
  }

  return (
    <>
      {cryptoDataAssets.map((cryptoInfo) => (
        <List
          key={cryptoInfo.id}
          className='crypto-row'
          styles={{ width: '100%' }}
          {...props}
          onClick={() => {
            goToPage(cryptoInfo.id)
          }}
        >
          <ListItem className='crypto-row__item crypto-row__item-name'>
            <span>{cryptoInfo.name}</span>
          </ListItem>
          <ListItem className='crypto-row__item crypto-row__item-symbol'>
            <span>{cryptoInfo.symbol}</span>
          </ListItem>
          <ListItem
            className='crypto-row__item crypto-row__item-price'
            styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}
          >
            <span>${Number(cryptoInfo.priceUsd).toFixed(getToFixedNumber(cryptoInfo.changePercent24Hr))}</span>
          </ListItem>
          <ListItem className='crypto-row__item' styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}>
            <span>{Number(cryptoInfo.changePercent24Hr).toFixed(getToFixedNumber(cryptoInfo.changePercent24Hr))}</span>
          </ListItem>
          <ListItem className='crypto-row__item crypto-row__item-market'>
            <span>${Number(cryptoInfo.marketCapUsd).toFixed(getToFixedNumber(cryptoInfo.marketCapUsd))}</span>
          </ListItem>
        </List>
      ))}
    </>
  )
}

export default CryptoList
