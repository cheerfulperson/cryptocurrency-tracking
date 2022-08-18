import * as React from 'react'
import { render } from '@testing-library/react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Avatar from '../../components/Avatar/Avatar'

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
  test('Should display a input with class name', async () => {
    const src = './app.png'
    const input = shallow(<Avatar src={src} />)
    expect(input.find('img').props().src).toBe(src)
  })
  test('Should display right label', async () => {
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
