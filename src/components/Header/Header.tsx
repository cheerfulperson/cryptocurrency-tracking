import * as React from 'react'
import { HeaderCryptoInfo } from '../../models/crypto-info.model'
import Button from '../Button/Button'
import List from '../List/List'
import ListItem from '../ListItem/ListItem'
import CryptoInfo from './CryptoInfo/CryptoInfo'
import { AiOutlineLeft } from 'react-icons/ai'
import './Header.scss'
import { useLocation } from 'react-router'
import { UserData } from '../../models/user.model'
import ProfileInfo from './ProfileInfo/ProfileInfo'

function Header() {
  const location = useLocation()
  const isHomePathName = location.pathname === '' || location.pathname === '/'
  const cryptocurrencies: HeaderCryptoInfo[] = [
    {
      cryptoCode: 'BTC',
      currencySympol: '$',
      price: 24698.46,
      profit: +2.79,
    },
    {
      cryptoCode: 'ETH',
      currencySympol: '$',
      price: 2698.46,
      profit: +2.21,
    },
    {
      cryptoCode: 'ADA',
      currencySympol: '$',
      price: 0.571244,
      profit: -1.19,
    },
  ]
  const userData: UserData = {
    currencyCode: 'USD',
    value: 134.23,
    oldValue: 122.93,
    cryptoData: []
  }
  return (
    <header className='header'>
      <article className='header__container'>
        <article className='header__side'>
          {!isHomePathName && (
            <Button type='custom'>
              <AiOutlineLeft />
            </Button>
          )}
          <List>
            {cryptocurrencies.map((cryptoInfo) => (
              <ListItem key={cryptoInfo.cryptoCode}>
                <CryptoInfo info={cryptoInfo} />
              </ListItem>
            ))}
          </List>
        </article>
        <article className='header__side'>
          <ProfileInfo info={userData}/>
        </article>
      </article>
    </header>
  )
}

export default Header
