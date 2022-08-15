import * as React from 'react'
import { useParams } from 'react-router'
import CryptocurrencyHeader from './CryptocurrencyHeader/CryptocurrencyHeader'
import { Bar, BarChart, Brush, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import { reqestSelectedCrypto } from '../../redux/actions/selected-crypto.actions'

import './Cryptocurrency.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../redux/initialStates'
import Loading from '../../components/Loading/Loading'

const { useState, useEffect } = React

function Cryptocurrency() {
  const [chartSize, setChartSize] = useState<number>(getChartSize())
  const isLoading = useSelector((state: AppState) => state.selectedCrypto.isLoading)
  const cryptoInfo = useSelector((state: AppState) => state.selectedCrypto.item)
  const cryptoHistory = useSelector((state: AppState) => state.selectedCrypto.history)
  const dispatch = useDispatch()
  const { id: currencyId } = useParams()

  useEffect(() => {
    dispatch(reqestSelectedCrypto(currencyId))
  }, [dispatch])

  React.useEffect(() => {
    function resize() {
      setChartSize(getChartSize())
    }
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [chartSize])

  function getChartSize() {
    const winWidth = window.innerWidth
    if (winWidth > 1024) {
      return 950
    }
    return winWidth
  }

  if (isLoading || isLoading === undefined || !cryptoInfo) {
    return <Loading />
  }

  return (
    <section className='cryptocurrency'>
      <CryptocurrencyHeader cryptoInfo={cryptoInfo} />
      <article className='cryptocurrency__body'>
        <article className='cryptocurrency__chart-block'>
          <BarChart
            className='cryptocurrency__chart'
            width={chartSize}
            height={400}
            data={cryptoHistory}
            margin={{ top: 5, right: 20, left: 10, bottom: 0 }}
          >
            <XAxis dataKey='time' tickMargin={10} padding={{ left: 0, right: 0 }} />
            <YAxis dataKey='priceUsd' />
            <Tooltip />
            <CartesianGrid stroke='#f5f5f5' />
            <Brush dataKey='time' height={30} fill='#8884d8' />
            <Bar dataKey='priceUsd' barSize={50} stroke='#8884d8'>
              {cryptoHistory?.map((entry, index, arr) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.priceUsd < arr[index - 1]?.priceUsd ? 'red' : '#82ca9d'}
                />
              ))}
            </Bar>
          </BarChart>
        </article>
      </article>
    </section>
  )
}

export default Cryptocurrency
