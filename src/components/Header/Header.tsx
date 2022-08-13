import * as React from 'react'
import { HeaderCryptoInfo } from '../../models/crypto-info.model'
import Button from '../Button/Button'
import List from '../List/List'
import ListItem from '../ListItem/ListItem'
import CryptoInfo from './CryptoInfo/CryptoInfo'
import { AiOutlineLeft } from 'react-icons/ai'
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
        <article className='header__side'>
          <Button type='custom'>
            <AiOutlineLeft />
          </Button>
          <List>
            {cryptocurrencies.map((cryptoInfo) => (
              <ListItem key={cryptoInfo.cryptoCode}>
                <CryptoInfo info={cryptoInfo} />
              </ListItem>
            ))}
          </List>
        </article>
      </article>
    </header>
  )
}

export default Header
