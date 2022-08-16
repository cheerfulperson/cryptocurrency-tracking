import * as React from 'react'
import CryptoList from './CryptoList/CryptoList'
import './Home.scss'
import Button from '../../components/Button/Button'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { AppState } from '../../redux/initialStates'
import { useSelector } from 'react-redux'
import anime from 'animejs'

function Home() {
  const [page, setPage] = React.useState<number>(0)
  const pages = useSelector((state: AppState) => state.homeCrypto.pages)
  const oldPage = useSelector((state: AppState) => state.homeCrypto.offset)

  function handleClick(increment: number) {
    let newPage = page + increment
    if (newPage < 0) {
      newPage = pages
    }
    if (newPage > pages) {
      newPage = 0
    }
    setPage(newPage)
  }

  React.useEffect(() => {
    setPage(oldPage)
    anime.timeline({ loop: false }).add({
      targets: '.home__title span',
      scale: [0, 1],
      duration: 1500,
      elasticity: 600,
      delay: (el, i) => 45 * (i + 1),
    })
  }, [])

  return (
    <>
      <section className='home'>
        <h1 className='home__title'>
          {'Buy crypto at true cost'.split('').map((l, i) => (
            <span key={i} className={l !== ' ' ? 'letter' : ''}>
              {l}
            </span>
          ))}
        </h1>
        <p className='home__subtitle'>
          Buy and sell 250+ cryptocurrencies with 20+ fiat currencies using bank transfers or your
          credit/debit card.
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
          <CryptoList page={page} />
        </article>
      </section>
    </>
  )
}

export default Home
