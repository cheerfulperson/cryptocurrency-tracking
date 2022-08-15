import * as React from 'react'
import { CryptoAssets } from '../../models/crypto.models'
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
import { useQuery } from '@tanstack/react-query'
import { requestApi } from '../../api/api'
import './Header.scss'

function Header() {
  const [isUserPanelOpen, setIsUserPanelOpen] = React.useState(false)
  const location = useLocation()
  const history = useNavigate()
  const isHomePathName = location.pathname === '' || location.pathname === '/'

  const getCrypto = async () => {
    const res = await requestApi.get('assets', {params: {
      ids: ['bitcoin', 'ethereum', 'monero'].join(',')
    }})
    return res.data.data
  }
  const { isLoading, data: cryptocurrencies } = useQuery<CryptoAssets[]>([null], getCrypto)

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
              {!isLoading && cryptocurrencies?.map((cryptoInfo) => (
                <ListItem key={cryptoInfo.id}>
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
