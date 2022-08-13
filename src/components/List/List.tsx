import * as React from 'react'
import './List.scss'

interface ListProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  styles?: React.CSSProperties
  children?: JSX.Element[] | JSX.Element
}

function List({ styles, children, ...props }: ListProps) {
  return (
    <ul className='list' style={styles} {...props}>
      {children}
    </ul>
  )
}

export default List
