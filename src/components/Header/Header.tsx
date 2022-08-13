import * as React from 'react'
import { HeaderCryptoInfo } from '../../models/crypto-info.model'
import Button from '../Button/Button'
import List from '../List/List'
import ListItem from '../ListItem/ListItem'
import CryptoInfo from './CryptoInfo/CryptoInfo'
import './Header.scss'

function Header() {
  const cryptocurrencies: HeaderCryptoInfo[] = [
    {
      cryptoCode: 'BTC',
      currency: '$',
      price: 24698.46,
      profit: +2.79,
    },
    {
      cryptoCode: 'ETH',
      currency: '$',
      price: 2698.46,
      profit: +2.21,
    },
    {
      cryptoCode: 'ADA',
      currency: '$',
      price: 0.571244,
      profit: -1.19,
    },
  ]
  return (
    <header className='header'>
      <article className='header__container'>
        <Button>s</Button>
        <List>
          {cryptocurrencies.map((cryptoInfo) => (
            <ListItem key={cryptoInfo.cryptoCode}>
              <CryptoInfo info={cryptoInfo} />
            </ListItem>
          ))}
        </List>
      </article>
    </header>
  )
}

export default Header
