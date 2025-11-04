import type { ReactNode } from 'react'

interface ActionButtonProps {
  onClick?: () => void
  children?: ReactNode
}

export function ActionButton({ onClick, children = 'Button' }: ActionButtonProps) {
  return (
    <button type='button' onClick={onClick} className='btn-action bg-primary-radial'>
      {children}
    </button>
  )
}
