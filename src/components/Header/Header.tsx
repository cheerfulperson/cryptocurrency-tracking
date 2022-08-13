import * as React from 'react'
import { HeaderCryptoInfo } from '../../models/crypto-info.model'
import Button from '../Button/Button'
import List from '../List/List'
import ListItem from '../ListItem/ListItem'
import CryptoInfo from './CryptoInfo/CryptoInfo'
import { AiOutlineLeft } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router'
import { UserData } from '../../models/user.model'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Avatar from '../Avatar/Avatar'

import userImg from '../../assets/avatar.png'
import './Header.scss'

function Header() {
  const location = useLocation()
  const history = useNavigate()
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
    cryptoData: [],
  }
  return (
    <header className='header'>
      <article className='header__container'>
        <article className='header__side'>
          {!isHomePathName && (
            <Button type='custom' onClick={() => history('')}>
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
          <ProfileInfo info={userData} />
          <Avatar src={userImg} styles={{ margin: '0 0 0 10px' }} />
        </article>
      </article>
    </header>
  )
}

export default Header
