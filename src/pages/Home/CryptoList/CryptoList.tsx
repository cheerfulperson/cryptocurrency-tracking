import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import List from '../../../components/List/List'
import ListItem from '../../../components/ListItem/ListItem'
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
  const history = useNavigate()
  const isLoading = useSelector((state: AppState) => state.homeCrypto.isLoading)
  const cryptoDataAssets = useSelector((state: AppState) => state.homeCrypto.items)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(reqestCrypto(page))
  }, [page])
  function goToPage(currencyId: string) {
    history(`/cryptocurrency/${currencyId}`)
  }

  console.log(isLoading);
  if (isLoading || isLoading === undefined || !cryptoDataAssets) {
    return <>loading</>
  }

  return (
    <>
      {cryptoDataAssets.map((cryptoInfo) => (
        <List
          key={cryptoInfo.id}
          className='crypto-row'
          styles={{ width: '100%' }}
          {...props}
          onClick={() => {
            goToPage(cryptoInfo.id)
          }}
        >
          <ListItem className='crypto-row__item crypto-row__item-name'>
            <span>{cryptoInfo.name}</span>
          </ListItem>
          <ListItem className='crypto-row__item crypto-row__item-symbol'>
            <span>{cryptoInfo.symbol}</span>
          </ListItem>
          <ListItem
            className='crypto-row__item crypto-row__item-price'
            styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}
          >
            <span>${Number(cryptoInfo.priceUsd).toFixed(getToFixedNumber(cryptoInfo.priceUsd))}</span>
          </ListItem>
          <ListItem className='crypto-row__item' styles={{ color: getPriceColor(cryptoInfo.changePercent24Hr) }}>
            <span>{Number(cryptoInfo.changePercent24Hr).toFixed(getToFixedNumber(cryptoInfo.changePercent24Hr))}</span>
          </ListItem>
          <ListItem className='crypto-row__item crypto-row__item-market'>
            <span>${Number(cryptoInfo.marketCapUsd).toFixed(getToFixedNumber(cryptoInfo.marketCapUsd))}</span>
          </ListItem>
        </List>
      ))}
    </>
  )
}

export default CryptoList
