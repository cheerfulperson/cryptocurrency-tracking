import * as React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import Button from '../../../components/Button/Button'
import BuyModal from '../../../components/BuyModal/BuyModal'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { CryptoAssets } from '../../../models/crypto.models'
import { AppState } from '../../../redux/initialStates'
import { getToFixedNumber } from '../../../utils/cummon'
import './CryptocurrencyHeader.scss'

interface CryptocurrencyHeaderProps {
  cryptoInfo: CryptoAssets
}

function CryptocurrencyHeader({ cryptoInfo }: CryptocurrencyHeaderProps) {
  const [isOpenModal, setIsopenModal] = React.useState(false)
  const userDataInfo = useSelector((state: AppState) => state.userData)
  const [, setUserData] = useLocalStorage('userData', userDataInfo)
  const { name, symbol, priceUsd, changePercent24Hr, vwap24Hr, volumeUsd24Hr } = cryptoInfo

  React.useEffect(() => {
    if (userDataInfo) {
      setUserData(userDataInfo)
    }
  }, [userDataInfo])

  return (
    <>
      <BuyModal
        isOpenByModal={isOpenModal}
        cryptoInfo={cryptoInfo}
        onClose={(isOpen) => setIsopenModal(isOpen)}
      />

      <article className='cryptocurrency-header'>
        <h2 className='cryptocurrency-header__name'>
          <span>{name}</span>/<span>{symbol}</span>
        </h2>
        <div className='cryptocurrency-header__block'>
          <p className='cryptocurrency-header__text-block'>
            <span>Last price:</span>
            <span>{Number(priceUsd).toFixed(getToFixedNumber(priceUsd))}</span>
          </p>
          <p className='cryptocurrency-header__text-block'>
            <span>Daily change:</span>
            <span>{Number(changePercent24Hr).toFixed(getToFixedNumber(changePercent24Hr))}</span>
          </p>
          <p className='cryptocurrency-header__text-block'>
            <span>Today`s open:</span>
            <span>{Number(vwap24Hr).toFixed(getToFixedNumber(vwap24Hr))}</span>
          </p>
          <p className='cryptocurrency-header__text-block'>
            <span>24h volume:</span>
            <span>{Number(volumeUsd24Hr).toFixed(getToFixedNumber(volumeUsd24Hr))}</span>
          </p>
        </div>
        <Button type='custom' styles={{ margin: '20px 5px' }} onClick={() => setIsopenModal(true)}>
          <AiOutlinePlusCircle style={{ width: '25px', height: '25px' }} />
        </Button>
      </article>
    </>
  )
}

export default CryptocurrencyHeader
