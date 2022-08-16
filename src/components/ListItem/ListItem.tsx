import * as React from 'react'
import './ListItem.scss'

interface ListItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  styles?: React.CSSProperties
  children?: JSX.Element[] | JSX.Element
}

function ListItem({ styles, children, ...props }: ListItemProps) {
  return (
    <li className='list-item' style={styles} {...props}>
      {children}
    </li>
  )
}

export default ListItem
