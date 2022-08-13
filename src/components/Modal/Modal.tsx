import * as React from 'react'
import './Modal.scss'

interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  isOpen: boolean
  onChange: (isOpen: boolean) => void
  children?: JSX.Element | JSX.Element[]
  className?: string
  containerClassName?: string
}

function Modal({ isOpen: propIsOpen, containerClassName, children, className, onChange, ...props }: ModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(propIsOpen)
  })

  function handleSectionClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    const target = e.target as HTMLElement

    if (!target.closest('.modal__container')) {
      setIsOpen(false)
      onChange(false)
    }
  }

  return (
    <section
      className={`modal ${className || ''} ${isOpen ? '' : 'modal-hide'}`}
      {...props}
      onClick={(e) => handleSectionClick(e)}
    >
      <article className={`modal__container ${containerClassName || ''}`}>{children}</article>
    </section>
  )
}

export default Modal
