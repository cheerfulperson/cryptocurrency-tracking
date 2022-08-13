import * as React from 'react'
import './Avatar.scss'

export interface AvatarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  styles?: React.CSSProperties
  src: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Avatar({ styles, src, onClick, ...props }: AvatarProps) {
  return (
    <button
      className='avatar'
      style={styles}
      onClick={(e) => (onClick ? onClick(e) : null)}
      {...props}
    >
      <img src={src} alt="avatar" className='avatar__image' />
    </button>
  )
}

export default Avatar
