import * as React from 'react'
import { useParams } from 'react-router'
import CryptocurrencyHeader from './CryptocurrencyHeader/CryptocurrencyHeader'
import { reqestSelectedCrypto } from '../../redux/actions/selected-crypto.actions'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/initialStates'
import Loading from '../../components/Loading/Loading'
import { BarChart } from '../../components/BarChart/BarChart'

import './Cryptocurrency.scss'

const { useEffect } = React

function Cryptocurrency() {
  const isLoading = useSelector((state: AppState) => state.selectedCrypto.isLoading)
  const cryptoInfo = useSelector((state: AppState) => state.selectedCrypto.item)
  const cryptoHistory = useSelector((state: AppState) => state.selectedCrypto.history)
  const dispatch = useDispatch()
  const { id: currencyId } = useParams()

  useEffect(() => {
    dispatch(reqestSelectedCrypto(currencyId))
  }, [dispatch])


  if (isLoading || isLoading === undefined || !cryptoInfo) {
    return <Loading />
  }

  return (
    <section className='cryptocurrency'>
      <CryptocurrencyHeader cryptoInfo={cryptoInfo} />
      <article className='cryptocurrency__body'>
        <article className='cryptocurrency__chart-block'>
          <BarChart data={cryptoHistory}/>
        </article>
      </article>
    </section>
  )
}

export default Cryptocurrency
