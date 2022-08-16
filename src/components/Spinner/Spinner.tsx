import * as React from 'react'
import './Spinner.scss'

interface SpinnerProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  className?: string
}

function Spinner({ className, ...props }: SpinnerProps) {
  return <article className={`loader ${className || ''}`} {...props}></article>
}

export default Spinner
