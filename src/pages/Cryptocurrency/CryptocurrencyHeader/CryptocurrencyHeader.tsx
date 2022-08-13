import * as React from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Button from '../../../components/Button/Button'
import Input from '../../../components/Input/Input'
import Modal from '../../../components/Modal/Modal'
import { CryptoAssets } from '../../../models/crypto.models'
import { getToFixedNumber } from '../../../utils/cummon'
import './CryptocurrencyHeader.scss'

interface CryptocurrencyHeaderProps {
  cryptoInfo: CryptoAssets
}

function CryptocurrencyHeader({ cryptoInfo }: CryptocurrencyHeaderProps) {
  const { name, symbol, priceUsd, changePercent24Hr, vwap24Hr, volumeUsd24Hr } = cryptoInfo
  const [isOpenModal, setIsopenModal] = React.useState(false)

  function  handleBuyCryptoClick() {
    setIsopenModal(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onChange={(isOpen) => {
          setIsopenModal(isOpen)
        }}
      >
        <Input
          label={`Buy ${cryptoInfo.name}: $${Number(cryptoInfo.priceUsd).toFixed(
            getToFixedNumber(cryptoInfo.priceUsd),
          )}`}
          containerClassName='modal-input'
        />
        <Input
          label={`Sell ${cryptoInfo.name}: $${Number(+cryptoInfo.priceUsd - 10).toFixed(
            getToFixedNumber(cryptoInfo.vwap24Hr),
          )}`}
          containerClassName='modal-input'
        />
        <Button type='free' onClick={() => handleBuyCryptoClick()}>
          <span>submit</span>
        </Button>
      </Modal>

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
