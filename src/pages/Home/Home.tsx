import * as React from 'react'
import { CryptoAssets } from '../../models/crypto.models'
import { cryptoAssets } from './mockdata'
import CryptoList from './CryptoList/CryptoList'
import './Home.scss'
import Button from '../../components/Button/Button'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

function Home() {
  const [page, setPage] = React.useState<number>(0)
  const cryptoDataAssets: CryptoAssets[] = cryptoAssets
  const dataAssets = cryptoDataAssets.slice(page * 10, page * 10 + 10)
  const pages = Math.ceil(cryptoDataAssets.length / 10)

  return (
    <section className='home'>
      <h1 className='home__title'>Buy crypto at true cost</h1>
      <p className='home__subtitle'>
        Buy and sell 250+ cryptocurrencies with 20+ fiat currencies using bank transfers or your credit/debit card.
      </p>
      <article className='home__pagination'>
        <Button type='custom' onClick={() => setPage(page - 1 < 0 ? pages - 1 : page - 1)}>
          <AiOutlineLeft />
        </Button>
        <p className='home__pages'>
          {page + 1} / {pages}
        </p>
        <Button type='custom' onClick={() => setPage(page + 2 > pages ? 0 : page + 1)}>
          <AiOutlineRight />
        </Button>
      </article>
      <article className='home__currency-table'>
        <CryptoList cryptoDataAssets={dataAssets} />
      </article>
    </section>
  )
}

export default Home
