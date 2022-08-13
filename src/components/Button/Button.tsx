import * as React from 'react'
import './Button.scss'

export type ButtonTypes = 'custom' | 'free'

export interface ButtonProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  type?: ButtonTypes
  styles?: React.CSSProperties
  children?: JSX.Element | JSX.Element[] | string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Button({ styles, type, className, children, onClick, ...props }: ButtonProps) {
  return (
    <button
      className={`ui-button ${type ? `${type}-button` : ''} ${className || ''}`}
      style={styles}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
