import * as React from 'react'
import CryptoList from './CryptoList/CryptoList'
import './Home.scss'
import Button from '../../components/Button/Button'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { AppState } from '../../redux/initialStates'
import { useDispatch, useSelector } from 'react-redux'
import { reqestCrypto } from '../../redux/actions/crypto.actions'

function Home() {
  const [page, setPage] = React.useState<number>(0)
  const pages = useSelector((state: AppState) => state.homeCrypto.pages)
  const isLoading = useSelector((state: AppState) => state.homeCrypto.isLoading)
  const dataAssets = useSelector((state: AppState) => state.homeCrypto.items)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(reqestCrypto(page, 0))
  }, [dispatch])

  function handleClick(increment: number) {
    let newPage = page + increment;
    if (newPage < 0) {
        newPage = pages
    } 
    if (newPage > pages){
        newPage = 0
    }
    setPage(newPage)
    dispatch(reqestCrypto(newPage, pages))
  }

  if (isLoading || isLoading === undefined || !dataAssets) {
    return <>loading</>
  }
  return (
    <section className='home'>
      <h1 className='home__title'>Buy crypto at true cost</h1>
      <p className='home__subtitle'>
        Buy and sell 250+ cryptocurrencies with 20+ fiat currencies using bank transfers or your credit/debit card.
      </p>
      <article className='home__pagination'>
        <Button type='custom' onClick={() => handleClick(-1)}>
          <AiOutlineLeft />
        </Button>
        <p className='home__pages'>
          {page + 1} / {pages + 1}
        </p>
        <Button type='custom' onClick={() => handleClick(1)}>
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
