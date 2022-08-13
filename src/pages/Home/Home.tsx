import * as React from 'react'
import { CryptoAssets } from '../../models/crypto.model'
import { cryptoAssets } from './mockdata'
import './Home.scss'
import List from '../../components/List/List'
import ListItem from '../../components/ListItem/ListItem'

function Home() {
  const cryptoDataAssets: CryptoAssets[] = cryptoAssets
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
    return 8;
  }
  const getPriceColor = (price: number | string) => {
    return +price > 0 ? '#19e219' : '#ff0000'
  }

  return (
    <section className='home'>
      <h1 className='home__title'>Buy crypto at true cost</h1>
      <p className='home__subtitle'>
        Buy and sell 250+ cryptocurrencies with 20+ fiat currencies using bank transfers or your credit/debit card.
      </p>
      <article className='home__currency-table'>
        {cryptoDataAssets.map((cryptoInfo) => (
          <List key={cryptoInfo.id} className='crypto-row' styles={{ width: '100%' }}>
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
            <ListItem
              className='crypto-row__item'
              styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}
            >
              <span>
                {Number(cryptoInfo.changePercent24Hr).toFixed(getToFixedNumber(cryptoInfo.changePercent24Hr))}
              </span>
            </ListItem>
            <ListItem className='crypto-row__item crypto-row__item-market'>
              <span>${Number(cryptoInfo.marketCapUsd).toFixed(getToFixedNumber(cryptoInfo.marketCapUsd))}</span>
            </ListItem>
          </List>
        ))}
      </article>
    </section>
  )
}

export default Home
