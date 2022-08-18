import * as React from 'react'
import { render } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Avatar from '../../components/Avatar/Avatar'
import Spinner from '../../components/Spinner/Spinner'
import List from '../../components/List/List'
import ListItem from '../../components/ListItem/ListItem'
import Modal from '../../components/Modal/Modal'
import { BarChart } from '../../components/BarChart/BarChart'
import { CryptoHistory } from '../../models/crypto.models'
import PieChart from '../../components/PieChart/PieChart'
import { UsersCrypto } from '../../models/user.model'

Enzyme.configure({ adapter: new Adapter() })

describe('Button', () => {
  test('should display a button', async () => {
    const text = 'add'
    const element = render(<Button type='custom'>{text}</Button>)
    expect(element.asFragment().textContent).toBe(text)
  })
  test('should display a custom button', async () => {
    const button = shallow(<Button type='custom' />)

    expect(button.hasClass('custom-button')).toEqual(true)
  })
  test('should display a free button', async () => {
    const button = shallow(<Button type='free' />)

    expect(button.hasClass('free-button')).toEqual(true)
  })
  test('should handle click', async () => {
    const button = shallow(
      <Button
        type='custom'
        onClick={() => {
          expect(true).toBe(true)
        }}
      />,
    )
    button.find('button').simulate('click')
  })
})

describe('Input', () => {
  test('Should display a input with class name', async () => {
    const input = shallow(<Input className='input' containerClassName='name' />)
    expect(input.hasClass('name')).toBe(true)
    expect(input.childAt(0).hasClass('input')).toBe(true)
  })
  test('Should display right label', async () => {
    const input = shallow(<Input label='name' />)
    expect(input.childAt(1).text()).toBe('name')
  })
})

describe('Avatar', () => {
  test('Should display a avatar with image', async () => {
    const src = './app.png'
    const input = shallow(<Avatar src={src} />)
    expect(input.find('img').props().src).toBe(src)
  })
  test('Should click avatar', async () => {
    const button = shallow(
      <Avatar
        src=''
        onClick={() => {
          expect(true).toBe(true)
        }}
      />,
    )
    button.find('button').simulate('click')
  })
})

describe('Spinner', () => {
  test('Should display Spinner with middle size and warn theme', async () => {
    const classNameSize = 'loader-middle'
    const classNameTheme = 'loader-middle'
    const spinner = shallow(<Spinner size='middle' theme='warn' />)

    expect(spinner.hasClass(classNameSize)).toBe(true)

    expect(spinner.hasClass(classNameTheme)).toBe(true)

    expect(spinner.type()).toBe('article')
  })
})

describe('List', () => {
  const listItems = ['car', 'ship', 'tank']
  const children = listItems.map((str) => <ListItem key={str}>{<span>{str}</span>}</ListItem>)
  let spinner: Enzyme.ShallowWrapper

  beforeAll(() => {
    spinner = shallow(<List>{children}</List>)
  })
  test('Should display list', async () => {
    expect(spinner.exists()).toBe(true)
  })

  test('Should display list with children', async () => {
    expect(spinner.contains(children)).toBe(true)
  })
})

describe('Modal window', () => {
  const children = () => (
    <>
      <h1 className='title'>Modal</h1>
      <p className='text'>text</p>
    </>
  )
  const mockCallBack = jest.fn()

  let modal: Enzyme.ShallowWrapper

  beforeAll(() => {
    modal = shallow(
      <Modal isOpen={true} onChange={mockCallBack}>
        <div>{children}</div>
      </Modal>,
    )
  })

  test('Should open modal window', () => {
    expect(modal.hasClass('modal-hide')).toBe(true)
  })

  test('Should close modal window', () => {
    const element = 'section'
    modal.find('section').simulate('click', {
      target: {
        closest(str: string) {
          return str === element
        },
      },
    })
    expect(mockCallBack.mock.calls[0][0]).toBe(false)
  })

  test('Should contain children', () => {
    const element = modal.find('.title')
    expect(!!element).toBe(true)
  })
})

describe('Bar chart', () => {
  const history: CryptoHistory[] = [
    {
      priceUsd: '112.222',
      time: Date.now(),
    },
    {
      priceUsd: '112.222',
      time: Date.now(),
    },
    {
      priceUsd: '112.222',
      time: Date.now(),
    },
    {
      priceUsd: '112.222',
      time: Date.now(),
    },
  ]
  let barChart: Enzyme.ShallowWrapper
  const height = 500

  beforeAll(() => {
    barChart = shallow(
      <BarChart data={history} height={height} margin={{ top: 0, bottom: 0, left: 0, right: 0 }} />,
    )
  })

  test('Should display chart with height', async () => {
    const svg = barChart.find('svg')
    expect(svg.html().includes(`${height}`)).toBe(true)
  })

  test('Should display chart with data', async () => {
    expect(!!barChart.find('rect')).toBe(true)
  })
})

describe('Pie chart', () => {
  const cryptoData: UsersCrypto[] = [
    {
      amount: 10,
      purchasePrice: 100,
      crypto: {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUsd: '23382.1649630199587733',
        marketCapUsd: '447187552535.4909426529311348',
        changePercent24Hr: '-0.0539484513410834',
        maxSupply: '222',
        rank: '1',
        supply: 1,
        volumeUsd24Hr: '222',
        vwap24Hr: '2222',
      },
    },
    {
      amount: 10,
      purchasePrice: 100,
      crypto: {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUsd: '23382.1649630199587733',
        marketCapUsd: '447187552535.4909426529311348',
        changePercent24Hr: '-0.0539484513410834',
        maxSupply: '222',
        rank: '1',
        supply: 1,
        volumeUsd24Hr: '222',
        vwap24Hr: '2222',
      },
    },
    {
      amount: 10,
      purchasePrice: 100,
      crypto: {
        id: 'bitcoin',
        symbol: 'BTC',
        name: 'Bitcoin',
        priceUsd: '23382.1649630199587733',
        marketCapUsd: '447187552535.4909426529311348',
        changePercent24Hr: '-0.0539484513410834',
        maxSupply: '222',
        rank: '1',
        supply: 1,
        volumeUsd24Hr: '222',
        vwap24Hr: '2222',
      },
    },
  ]
  let pieChart: Enzyme.ShallowWrapper
  const height = 500

  beforeAll(() => {
    pieChart = shallow(<PieChart data={cryptoData} height={height} />)
  })

  test('Should display chart with height', async () => {
    const svg = pieChart.find('svg')
    expect(svg.html().includes(`${height}`)).toBe(true)
  })

  test('Should display pie chart with data', async () => {
    expect(!!pieChart.find('path')).toBe(true)
  })
})
