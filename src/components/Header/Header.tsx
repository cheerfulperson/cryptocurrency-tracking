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
import Modal from '../Modal/Modal'
import { userProfileCrypto } from './mockdata'
import { getToFixedPrice } from '../../utils/cummon'
import userImg from '../../assets/avatar.png'
import './Header.scss'

function Header() {
  const [isUserPanelOpen, setIsUserPanelOpen] = React.useState(false)
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
    cryptoData: userProfileCrypto,
  }
  return (
    <>
      <header className='header'>
        <article className='header__container'>
          <article className='header__side'>
            {!isHomePathName && (
              <Button type='custom' onClick={() => history('')}>
                <AiOutlineLeft />
              </Button>
            )}
            <List className='header__currency-list'>
              {cryptocurrencies.map((cryptoInfo) => (
                <ListItem key={cryptoInfo.cryptoCode}>
                  <CryptoInfo info={cryptoInfo} />
                </ListItem>
              ))}
            </List>
          </article>
          <article className='header__side'>
            <ProfileInfo info={userData} />
            <Avatar src={userImg} styles={{ margin: '0 0 0 10px' }} onClick={() => setIsUserPanelOpen(true)} />
          </article>
        </article>
      </header>
      <Modal
        isOpen={isUserPanelOpen}
        onChange={(isOpen) => {
          setIsUserPanelOpen(isOpen)
        }}
        containerClassName='user-panel'
      >
        <h2 className='user-panel__title'>User Panel</h2>
        <div className='user-panel__info'>
          <p className='user-panel__subtext'>Total balance: </p>
          <ProfileInfo info={userData} />
        </div>
        <article className='user-panel__currency-list'>
          {userData.cryptoData.map((userCrypto) => (
            <article key={userCrypto.crypto.id} className='profile-item'>
              <h2 className='profile-item__title'>{userCrypto.crypto.name}</h2>
              <div>
                <p className='profile-item__item'>Bought at a price: {getToFixedPrice(userCrypto.purchasePrice)}</p>
                <p className='profile-item__item'>Amount: {userCrypto.amount}</p>
                <p className='profile-item__item'>
                  Current price:{' '}
                  {getToFixedPrice(userCrypto.crypto.priceUsd)}
                </p>
                <p className='profile-item__item'>
                  Your profit:{' '}
                  {getToFixedPrice(+userCrypto.crypto.priceUsd - userCrypto.purchasePrice)}
                </p>
              </div>
              <Button type='custom'>Sell all</Button>
            </article>
          ))}
        </article>
        <Button className='user-panel__close-btn' onClick={() => setIsUserPanelOpen(false)}>x</Button>
      </Modal>
    </>
  )
}

export default Header
