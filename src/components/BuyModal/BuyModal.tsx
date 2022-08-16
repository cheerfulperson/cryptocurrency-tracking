import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { CryptoAssets } from '../../models/crypto.models'
import { addCryptoToUserData } from '../../redux/actions/user-data.actions'
import { AppState } from '../../redux/initialStates'
import { getMaxAmount, getToFixedPrice } from '../../utils/cummon'
import Button from '../Button/Button'
import Input from '../Input/Input'
import Modal from '../Modal/Modal'
import './BuyModal.scss'

interface BuyModalProps {
  cryptoInfo: CryptoAssets
  isOpenByModal: boolean
  onSubmit?: (fromData: { [key: string]: string | number }) => void
  onClose?: (isOpen: boolean) => void
}

function BuyModal({ cryptoInfo, isOpenByModal, onSubmit, onClose }: BuyModalProps) {
  const [cryptoAmount, setCryptoAmount] = React.useState(0)
  const [isOpenModal, setIsopenModal] = React.useState(isOpenByModal)
  const userDataInfo = useSelector((state: AppState) => state.userData)
  const [, setUserData] = useLocalStorage('userData', userDataInfo)
  const min = +cryptoInfo.priceUsd / 100000
  const max = getMaxAmount(cryptoInfo.priceUsd)

  const dispatch = useDispatch()

  React.useEffect(() => {
    setIsopenModal(isOpenByModal)
  }, [isOpenByModal])

  React.useEffect(() => {
    if (userDataInfo) {
      setUserData(userDataInfo)
    }
  }, [userDataInfo])

  function handleBuyCryptoClick() {
    dispatch(
      addCryptoToUserData({
        amount: cryptoAmount,
        purchasePrice: Number(cryptoInfo.priceUsd),
        crypto: cryptoInfo,
      }),
    )
    if (onSubmit) {
      onSubmit({
        cryptoExpenses: cryptoAmount,
      })
    }
    onClose(false)
    setIsopenModal(false)
  }

  function handleInput(target: HTMLInputElement) {
    const value = +target.value;
    if (!target.value.match(/^[0-9.,]*$/)) {
      target.value = ''
    }
    if (value > max || value < min) {
        target.style.color = 'red'
        return
    }
    target.style.color = ''
    setCryptoAmount(parseFloat(target.value))
  }

  return (
    <Modal
      isOpen={isOpenModal}
      onChange={(isOpen) => {
        onClose(isOpen)
        setIsopenModal(isOpen)
      }}
    >
      <p className='modal__text'>
        <span>You can buy:</span>
        <span>
          min: {getToFixedPrice(min)} {cryptoInfo.symbol}
        </span>
        <span>
          max: {max} {cryptoInfo.symbol}
        </span>
      </p>
      <Input
        label={`Buy ${cryptoInfo.name}: $${getToFixedPrice(cryptoInfo.priceUsd)}`}
        type='number'
        containerClassName='modal__input'
        onInput={(e) => {
          const target = e.target as HTMLInputElement
          handleInput(target)
        }}
      />
      <Button type='free' onClick={() => handleBuyCryptoClick()}>
        <span>submit</span>
      </Button>
    </Modal>
  )
}

export default BuyModal
