import * as React from 'react'
import './Spinner.scss'

export type SpinnerThemesTypes = 'warn' | 'primary' | 'red' | 'black'
export type SpinnerSizeTypes = 'small' | 'middle' | 'big'

interface SpinnerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  className?: string
  theme?: SpinnerThemesTypes
  size?: SpinnerSizeTypes
}

function Spinner({ className, theme, size, ...props }: SpinnerProps) {
  return (
    <article
      className={`loader ${theme ? `loader-${theme}` : ''} ${size ? `loader-${size}` : ''} ${
        className || ''
      }`}
      {...props}
    ></article>
  )
}

export default Spinner
