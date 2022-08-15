import * as React from 'react'
import Spinner from '../Spinner/Spinner'
import './Loading.scss'

interface LoadingProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  className?: string
}

function Loading({ className, ...props }: LoadingProps) {
  return (
    <article className={`loading ${className || ''}`} {...props}>
      <Spinner />
    </article>
  )
}

export default Loading
