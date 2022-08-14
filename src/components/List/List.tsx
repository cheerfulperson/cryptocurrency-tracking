import * as React from 'react'
import './List.scss'

interface ListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  styles?: React.CSSProperties
  className?: string
  children?: JSX.Element[] | JSX.Element
}

function List({ styles, children, className, ...props }: ListProps) {
  return (
    <ul className={`list ${className || ''}`} style={styles} {...props}>
      {children}
    </ul>
  )
}

export default List
