import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import BuyModal from '../../../components/BuyModal/BuyModal'
import List from '../../../components/List/List'
import ListItem from '../../../components/ListItem/ListItem'
import Loading from '../../../components/Loading/Loading'
import { CryptoAssets } from '../../../models/crypto.models'
import { reqestCrypto } from '../../../redux/actions/crypto.actions'
import { AppState } from '../../../redux/initialStates'
import { getPriceColor, getToFixedNumber } from '../../../utils/cummon'
import './CryptoList.scss'

interface CryptoListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  page: number
}

function CryptoList({ page, ...props }: CryptoListProps) {
  const [isOpenModal, setIsopenModal] = React.useState(false)
  const [currentCryptoInfo, setCurrentCryptoInfo] = React.useState<CryptoAssets>()
  const isLoading = useSelector((state: AppState) => state.homeCrypto.isLoading)
  const cryptoDataAssets = useSelector((state: AppState) => state.homeCrypto.items)
  const dispatch = useDispatch()
  const history = useNavigate()

  React.useEffect(() => {
    dispatch(reqestCrypto(page))
  }, [page])

  function goToPage(currencyId: string, e: React.MouseEvent<HTMLUListElement, MouseEvent>) {
    const target = e.target as HTMLUListElement
    if (!target.closest('.crypto-row__button')) {
      history(`/cryptocurrency/${currencyId}`)
    }
  }

  if (isLoading || isLoading === undefined || !cryptoDataAssets) {
    return <Loading />
  }

  function handleClick(cryptoInfo: CryptoAssets) {
    setCurrentCryptoInfo(cryptoInfo)
    setIsopenModal(true)
  }

  return (
    <>
      {currentCryptoInfo ? (
        <BuyModal
          cryptoInfo={currentCryptoInfo}
          isOpenByModal={isOpenModal}
          onClose={(isOpen) => setIsopenModal(isOpen)}
        />
      ) : (
        ''
      )}
      {cryptoDataAssets.map((cryptoInfo) => (
        <List
          key={cryptoInfo.id}
          className='crypto-row'
          {...props}
          onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
            goToPage(cryptoInfo.id, e)
          }}
        >
          <ListItem className='crypto-row__item crypto-row__item-name'>
            <span>{cryptoInfo.name} </span>
            <span className='crypto-row__item-symbol'> {cryptoInfo.symbol}</span>
          </ListItem>
          <ListItem
            className='crypto-row__item crypto-row__item-price'
            styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}
          >
            <span>
              ${Number(cryptoInfo.priceUsd).toFixed(getToFixedNumber(cryptoInfo.priceUsd))}
            </span>
          </ListItem>
          <ListItem
            className='crypto-row__item crypto-row__item-change'
            styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}
          >
            <span>
              {Number(cryptoInfo.changePercent24Hr).toFixed(
                getToFixedNumber(cryptoInfo.changePercent24Hr),
              )}
            </span>
          </ListItem>
          <ListItem className='crypto-row__item crypto-row__item-market'>
            <span>
              ${Number(cryptoInfo.marketCapUsd).toFixed(getToFixedNumber(cryptoInfo.marketCapUsd))}
            </span>
          </ListItem>
          <ListItem className='crypto-row__item crypto-row__item-button'>
            <Button
              type='free'
              className='crypto-row__button'
              onClick={() => {
                handleClick(cryptoInfo)
              }}
            >
              Add
            </Button>
          </ListItem>
        </List>
      ))}
    </>
  )
}

export default CryptoList
