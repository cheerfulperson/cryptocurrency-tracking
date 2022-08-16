import * as React from 'react'
import './Input.scss'

export interface InputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  label?: string
  styles?: React.CSSProperties
  className?: string
  containerClassName?: string
  type?: string
  placeholder?: string
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ type, label, styles, containerClassName, className, onChange, onInput, ...props }: InputProps) {
  return (
    <div className={`input-group ${containerClassName || ''}`}>
      <input
        type={type ? type : 'text'}
        placeholder='Name'
        name='input'
        id='input'
        className={`input-group__field ${className || ''}`}
        style={styles}
        onChange={(e) => (onChange ? onChange(e) : null)}
        onInput={(e) => (onInput ? onInput(e) : null)}
        {...props}
      />
      <label htmlFor='input' className='input-group__label'>
        {label ? label : 'Name'}
      </label>
    </div>
  )
}

export default Input
