import { cn } from '@lib/utils'
import type { ReactNode } from 'react'

interface ActionButtonProps {
  onClick?: () => void
  children?: ReactNode
  disabled?: boolean
}

export function ActionButton({
  onClick,
  children = 'Button',
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      onClick={onClick}
      className={cn('btn-action bg-primary-radial', { 'opacity-50': disabled })}>
      {children}
    </button>
  )
}
