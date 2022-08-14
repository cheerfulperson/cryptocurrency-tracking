import * as React from 'react'
import { useParams } from 'react-router'
import CryptocurrencyHeader from './CryptocurrencyHeader/CryptocurrencyHeader'
import './Cryptocurrency.scss'
import { Bar, BarChart, Brush, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts'
import { cryptoHistory } from './mockdata'
import { getToFixedNumber } from '../../utils/cummon'

function Cryptocurrency() {
  const [chartSize, setChartSize] = React.useState<number>(getChartSize())
  const [isCryptoHistoryupdated, setIsCryptoHistoryupdated] = React.useState<boolean>(false)

  const { id } = useParams()
  console.log(id)
  const cryptoInfo = {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '17193925.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: '119150835874.4699281625807300',
    volumeUsd24Hr: '2927959461.1750323310959460',
    priceUsd: '6929.8217756835584756',
    changePercent24Hr: '-0.8101417214350335',
    vwap24Hr: '7175.0663247679233209',
  }

  React.useEffect(() => {
    function resize() {
      setChartSize(getChartSize())
    }
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [chartSize])

  React.useEffect(() => {
    if (!isCryptoHistoryupdated) {
      setIsCryptoHistoryupdated(true)
      cryptoHistory.forEach((value) => {
        const time = new Date(value.time)
        value.priceUsd = Number(value.priceUsd).toFixed(getToFixedNumber(value.priceUsd))
        value.time = `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
      })
    }
  })

  function getChartSize() {
    const winWidth = window.innerWidth
    if (winWidth > 1024) {
      return 950
    }
    return winWidth
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
            <Brush dataKey='priceUsd' height={30} fill='#8884d8' />
            <Bar dataKey='priceUsd' barSize={50} stroke='#8884d8'>
              {cryptoHistory.map((entry, index, arr) => (
                <Cell key={`cell-${index}`} fill={entry.priceUsd < arr[index - 1]?.priceUsd ? 'red' : '#82ca9d'} />
              ))}
            </Bar>
          </BarChart>
        </article>
      </article>
    </section>
  )
}

export default Cryptocurrency
