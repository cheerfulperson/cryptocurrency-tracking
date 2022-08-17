import * as React from 'react'
import './ListItem.scss'

interface ListItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  styles?: React.CSSProperties
  children?: JSX.Element[] | JSX.Element
  className?: string
}

function ListItem({ styles, className, children, ...props }: ListItemProps) {
  return (
    <li className={`list-item ${className ? className : ''}`} style={styles} {...props}>
      {children}
    </li>
  )
}

export default ListItem
